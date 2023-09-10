const nodemailer = require("nodemailer")

const sendMail = async (email, firstName) => {
    const contactTemplate = `
    <div>
        
            <h1 style="margin-bottom: 100px; color: blue; text-align: center">

                Hi ${firstName}, welcome to AXC tickets  Limited. 
            </h1>
            <p style="margin-top: 70px; text-align:center; width: 80%;>
            We're glad you're here. As an upcoming ticket provider company we're continually striving to meet fans wherever they are. We're here to help you get tickets to the live events you love.
            </p>
            <p style="margin-top: 30px; text-align:center; width: 80%;>
            When you buy directly from AXC Tickets you can be confident your tickets are real and our exclusive Verified Tickets are 100% guaranteed to get you in every time.    
            </p>
            <p>
                
            </p>
            <p>We thank you for putting your trust in us.</p>


        
        <p style="color:#2036ea ; text-align: center;"><i>The AXC Team.</i></p>
    </div>`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: process.env.Gmail,
        to: email,
        subject: "AXC —— Welcome Message",
        text: "AXC",
        html: contactTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = {sendMail}
