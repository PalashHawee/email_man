// import { db } from "@/server/db"

// export const POST = async (req: Request) => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const { data } = await req.json()
//     // console.log('clerk webhook received', data)
//     const emailAddress = data.email_addresses[0].email_address
//     const firstName = data.first_name
//     const lastName = data.last_name
//     const imageUrl = data.image_url
//     // const userId = data.id
//     await db.user.create({
//         data: {
//             // id: userId,
//             emailAddress,
//             firstName,
//             lastName,
//             imageUrl,
            
//         }
//     })
//     console.log('user created')
//     return new Response('Webhook received',{status: 200})
// }


import { db } from "@/server/db"

export const POST = async (req: Request) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await req.json()

    const emailAddress = data.email_addresses[0].email_address
    const firstName = data.first_name
    const lastName = data.last_name
    const imageUrl = data.image_url
    const userId = data.id

    // Check if a user with the same email already exists
    const existingUser = await db.user.findUnique({
        where: { emailAddress },
    })

    if (existingUser) {
        console.log('User with this email already exists')
        // You can either update the user or return an error response
        // If you want to update, you can do something like:
        // await db.user.update({
        //   where: { emailAddress },
        //   data: {
        //     firstName,
        //     lastName,
        //     imageUrl,
        //   }
        // })
        return new Response('User with this email already exists', { status: 409 })  // Conflict status
    }

    // Create new user if no user with the same email exists
    await db.user.create({
        data: {
            id: userId,  // Only if you're providing a custom id
            emailAddress,
            firstName,
            lastName,
            imageUrl,
        }
    })

    console.log('User created')
    return new Response('Webhook received', { status: 200 })
}
