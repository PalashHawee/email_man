import { db } from "@/server/db"

export const POST = async (req: Request) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await req.json()
    // console.log('clerk webhook received', data)
    const emailAddress = data.email_addresses[0].email_address
    const firstName = data.first_name
    const lastName = data.last_name
    const imageUrl = data.image_url
    const userId = data.id
    await db.user.create({
        data: {
            id: userId,
            emailAddress,
            firstName,
            lastName,
            imageUrl,
            
        }
    })
    console.log('user created')
    return new Response('Webhook received',{status: 200})
}