import React from 'react';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "How do I reset my Online Banking password?",
        answer: "Select Forgot customer ID or password on the sign in screen. Select Customer ID. Enter your details and select Next. Enter the SMS code sent to your registered mobile and select Authorize. Your customer ID will be displayed."
    },
    {
        question: "I've forgotten my password",
        answer: "You will need to create a new password if you’ve forgotten your old password. To do so, you’ll need your Customer ID, Date of birth, and the mobile registered for HowZat Protect™ SMS Code. <br>Then in Online Banking you will need to go to Service > Preferences > Security and select 'Change Password'."
    },
    {
        question: "What is a direct debit?",
        answer: "A direct debit is a regular automatic payment that authorises a merchant or service provider to withdraw an agreed amount of money from your nominated account. Direct debits are set up with an eligible transaction account using your BSB and Account Number. Note that direct debits are different from recurring payments. <br>A recurring payment is a regular automatic payment that authorises a merchant or service provider to charge your debit or credit card. Recurring payments are set up from your debit or credit card using your 16-digit card number, expiry date and CVC number on the back of your card."
    },
    {
        question: "How can i manage my Howzat Account?",
        answer: "The best way to manage your account is via the Howzat website. You can:<br>· See your balances, transaction history, and bill payment details<br>· Download and print your statements<br>· Activate your card and choose your card PIN<br>· Cancel a lost or stolen card and request a replacement<br>· Place a temporary lock on your card if you’ve misplaced it"
    },
    {
        question: "How long does the application process take?",
        answer: "It should take around 10 minutes to apply if you have all of your personal information handy. If you need to, you can save your partially completed application and continue right where you left off any time within 30 days. <br>Once you have submitted your application, you will receive a confirmation email in approximately 60 seconds, containing your application number, and a link which you can use to check the status of your application online. <br>If your application needs further assessment, we’ll advise you when you can expect to hear from us. If your application is approved, you should receive your card in 3-5 working days."
    },
    {
        question: "What should I do if my card is lost or stolen?",
        answer: "You can cancel a lost or stolen card online or via the Howzat app. We'll block your card immediately and send a replacement card to the address shown on your statement."
    },
    {
        question:"How do I activate my card?",
        answer:"It only takes a minute to activate your card and choose your card PIN online at Howzat app. You won’t receive a card PIN in the mail.<br>Simply log in to Howzat app anytime, anywhere with your ID number, surname and PIN to access your Howzat card.<br>Select your Howzat card and enter your 3-digit CVC number located on the back of your card. You will then be prompted to enter your password which is a combination of letters, numbers and special characters.<br>During activation of your card, you will be prompted to create a 4-digit card PIN. You can change your PIN at any time via the Howzat app."
    },
    {
        question:"What do I do if I receive a suspicious phone call?",
        answer:"If someone calls you with a Howzat credit card offer and asks for your personal information, you can call us on 132222 to confirm if the call is genuine. Howzat cardholders can call their Dedicated Concierge using the number found on the back of their card or in the Howzat App."
    },
    {
        question:"How does Howzat protect my Howzat account?",
        answer: "There are a number of ways we protect your Howzat account, so you can rest assured that your money is in safe hands.<br>With 24/7 fraud protection, we monitor every transaction you make on your Howzat credit card for irregular activity. If a suspicious transaction is detected, we may contact you to take action or may direct you to call us on 13 2222 where we will verify you and your account, and one of our friendly team members will be available to assist you in resolving the problem as soon as possible.<br><br>Please call this number only if you’re directed to. For all general enquiries or to report transactions that you don’t recognise, please call Howzat card support on 13 2222.<br><br>We also ask you to enter a password when you access features that are considered high risk such as activating your card, choosing your PIN, viewing statements and notices, locking your card or reporting it lost or stolen. This provides an extra layer of security to help protect your account from unauthorised access."
    },
    {
        question: "How can I protect myself online?",
        answer: "Make sure you protect yourself with an up-to-date operating system, browser, firewall, email filter, anti-virus software and spyware filter<br>· Avoid accessing Howzat in a public place or using a shared computer, if at all possible<br>· Always type howzat.com into your browser when logging in<br>· Keep your Howzat PIN, Howzat passcode and password secure and never disclose them to anyone<br>· Always click ‘Log out’ instead of closing your browser when you’re done<br>· Review your Howzat credit card statements as soon as you receive them and report any suspicious transactions immediately by calling us on 13 2222, anytime, 24 hours a day, 7 days a week. Howzat cardholders can call their Dedicated Concierge using the number found on the back of their card or in the Howzat App."
    },
    {
        question:"How do I close my Howzat account?",
        answer:"To close Howzat account, you can message us by tapping on the help icon in the Howzat app.<br>Our virtual assistant, Howzat AI, will check your account details and submit your request instantly, or connect you to a specialist if needed.<br>If you don’t have the Howzat app, you can contact us on 13 2222.<br>You can also close your credit card account online.<br><br>To help the account closure go smoothly, please ensure that you:<br>· Have a balance of $0.00<br>· Cancel any recurring or scheduled payments from the account, including direct debits<br>· Settle any outstanding account fees<br>· Understand that linked cards will also be deactivated<br>· Don’t have outstanding cheques to be presented<br><br>Before closing your account, you may want to compare it with our other products using our comparison table.<br>Once you’ve closed your account, it can’t be re-opened. If you want to open another account, you can do so through the Howzat app, through our website."
    }
]


function FAQPage() {
    return (
        <div>
            <h1>&nbsp; Frequently Asked Questions</h1>
            <ul>
                {faqs.map((faq, index) => (
                    <li key={index}>
                        <h3>{faq.question}</h3>
                        <p dangerouslySetInnerHTML={{__html:faq.answer}}></p> 
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default FAQPage;