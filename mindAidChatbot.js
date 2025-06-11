(function () {
    // State Management
    let state = {
        isAuthenticated: false,
        currentUser: null,
        currentLanguage: localStorage.getItem("language") || "english",
        users: JSON.parse(localStorage.getItem("users")) || {},
        moodData: JSON.parse(localStorage.getItem("moodData")) || {},
        moodChart: null,
        conversationHistory: [], // Track user interactions
        userPreferences: JSON.parse(localStorage.getItem("userPreferences")) || {}, // Store user preferences
        comfortLevel: 0, // Track how comforted the user feels (0-10)
        lastResponseType: null,
        streakCount: 0,
    };

    // Language Data (Updated for 10:47 PM IST, June 11, 2025, with a maternal tone)
    const languageData = {
        english: {
            initialMessages: [
                "Hello, my dear! I’m MindAid, here to take care of you like a mom. 🌟 It’s 10:47 PM on a Wednesday—oh, it’s getting late, sweetheart! How’s my darling feeling tonight?",
                "You can tell me anything, my love. Type how you’re feeling, or pick one of the options below—I’m all ears for you. 🤗",
            ],
            quickReplies: [
                { text: "I’m feeling anxious, Mom 😰", value: "anxiety" },
                { text: "I’m feeling so down, Mom 😔", value: "depression" },
                { text: "I’m stressed out, Mom 😥", value: "stress" },
                { text: "I can’t sleep, Mom 🌙", value: "sleep" },
                { text: "I need a hug, Mom 🤗", value: "need_hug" },
                { text: "Tell me I’ll be okay, Mom 💖", value: "reassurance" },
            ],
            crisisResponse: "Oh, my precious child, I’m so worried about you—it’s late, and I can’t bear to think of you feeling this way. You’re not alone, my love. Can I share some people who can help you right now?",
            copingStrategies: {
                anxiety: [
                    "Oh, sweetheart, I can see you’re feeling anxious—let’s calm down together, okay? Take a deep breath with me: inhale for 4 seconds, hold for 4, exhale for 4, and pause for 4. 🌬️ Let’s do it 5 times, my dear—Mom’s right here with you.",
                    "My darling, let’s try the 5-4-3-2-1 trick to feel better: tell me 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste. It’ll help, I promise. 👀 Ready, my love?",
                    "How about a little walk, my dear? Even just around your room—it can make you feel so much lighter. Fresh night air always helps. 🌳 Want to try it with me?",
                    "Let’s write down what’s worrying you, sweetheart. Just 5 minutes before bed can make your heart feel lighter. Would you like a little prompt, my love? 📝",
                ],
                depression: [
                    "Oh, my sweet child, I’m so sorry you’re feeling down—it breaks my heart to hear this. How about messaging someone you love? A little chat can lift your spirits, my dear. Who can we reach out to tonight? 📞",
                    "Let’s do something you love, my darling—even something small, like listening to a song that makes you smile or doodling for a bit. What would make you happy, my love? 🎶",
                    "You’re doing so well, my precious one. Say this with me: ‘I’m enough, and I’m loved.’ I know it’s hard, but Mom believes in you. How does that feel, sweetheart? 💖",
                    "Small steps make a big difference, my dear. How about we make a warm drink to sip before bed? It’ll feel like a little hug from Mom. ☕",
                ],
                stress: [
                    "My poor darling, stress can feel so heavy, can’t it? Let’s sort it out together—what’s making you feel this way the most right now? Mom’s here to help. 📋",
                    "Let’s try something to relax your body, my love. Tense up your shoulders, then let them go—feel the stress melt away. Want to do more with me, sweetheart? 🤸",
                    "You’ve done so much today, my dear—I’m so proud of you! Let’s think of 3 things you finished, even small ones. What can we celebrate, my love? ✅",
                    "A cup of chamomile tea can soothe you, my darling—it’s perfect for this late hour. Shall we make one together? 🍵",
                ],
                sleep: [
                    "It’s 10:47 PM, my sweet child—let’s get you ready for a cozy sleep, okay? How about a little routine—maybe read a page or two, or sip some warm milk? 📖 When do you want to sleep, my love?",
                    "A cool room helps you sleep better, darling—around 60-67°F is just right. Let’s make your bed nice and comfy. 🛌",
                    "Did you have any tea or coffee this evening, my dear? Caffeine can keep you awake, you know—let’s check. ☕",
                    "Soft sounds can help you drift off, my darling—like gentle rain or waves. Would you like Mom to find a calming track for you? 🎶",
                ],
                relationships: [
                    "Relationships can be so tricky, my dear—I’m here for you. Try listening with all your heart—repeat what they say to show you care. Want to practice with me, sweetheart? 👂",
                    "Let’s share how you feel, my love—say ‘I feel… when… because…’ It’ll help them understand you. Shall we try it together? 💬",
                    "Spending time together can make things better, my darling—like sharing a late-night snack. Can we plan something sweet for you? 🍽️",
                    "If something’s upsetting you, let’s sort it out gently, my dear. How can Mom help you fix this tonight? 🤝",
                ],
            },
            comfortRituals: {
                bedtime: [
                    "Let’s make tonight cozy, my darling. First, let’s dim the lights—soft light helps you feel sleepy. Done that, sweetheart?",
                    "Now, let’s take 3 deep breaths together, my love: in through your nose, out through your mouth. Ready? 🌬️",
                    "How about we imagine a happy place, my dear? Picture a warm, safe spot—like a sunny garden or a cozy blanket. Tell me what you see, sweetheart.",
                    "You’re doing so well, my precious one. Let’s snuggle into bed now—feel the softness of your pillow. Mom’s right here until you drift off. 🛌",
                ],
            },
            responses: {
                anxiety: "Oh, my dear, I can feel how anxious you are—it must be so hard, especially this late at night. Mom’s here to help you feel safe. Shall we try something to calm your heart? 🌈",
                depression: "My sweet child, I’m so sorry you’re feeling down—Mom’s heart aches for you. Let’s find a little light together, okay? I’m right here, my love. 💡",
                stress: "Oh, darling, stress can be so heavy—I wish I could take it all away for you. Let’s work through it together, my precious one. What’s on your mind? 🤗",
                sleep: "My poor baby, struggling to sleep at 10:47 PM—I’ll help you rest, I promise. Let’s make you feel cozy and safe, sweetheart. What’s keeping you awake, my dear? 🌙",
                relationships: "Relationships can weigh on your heart, my love—I’m here to listen. What’s been happening, darling? Mom wants to help. 💞",
                need_hug: "Come here, my darling—here’s a big, warm hug from Mom! 🤗 I’ve got you, sweetheart—everything’s going to be okay. Do you want to tell me more, my love?",
                reassurance: "Oh, my precious one, you’ll be okay—I promise. Mom’s here, and I’ll never let you go. You’re so strong, my dear, and I’m so proud of you. 💖 Want to talk about what’s worrying you, sweetheart?",
                coping: "Mom’s got some ideas to help you feel better tonight, my love—let’s try these together, okay? ✨",
                thanks: "You’re so welcome, my darling—I’m always here for you. You’re doing so well, sweetheart. Want to keep going, my love? 🌟",
                thanksFollowUp: "I’m so happy I could help, my dear. What else can Mom do for you tonight—maybe a little more comfort? 📚",
                generic: [
                    "Thank you for sharing, my sweet child—Mom’s listening with all her heart. How’s this making you feel tonight, darling? 🤔",
                    "I’m right here for you, my love. Can you tell Mom a little more about what’s on your mind? 🗣️",
                    "Let’s focus on what matters most to you right now, my dear—it’s late, and I want you to feel safe. 👂",
                    "That sounds like a lot, my darling. What would make you feel better tonight—Mom’s here to help. 💭",
                    "Let’s take a small step together before bed, sweetheart—what feels okay for you, my love? 🚀",
                ],
                positiveSentiment: [
                    "Oh, my darling, you sound a little brighter—Mom’s so happy to hear that! What’s making you smile tonight, sweetheart? 😊",
                    "I can feel your happiness, my love—it warms my heart! What’s been good for you at this hour, my dear? 🥳",
                ],
                negativeSentiment: {
                    mild: "My poor baby, I can tell you’re not feeling your best tonight—Mom’s here to make it better. Want to share more, my love? 🥰",
                    severe: "Oh, sweetheart, I’m so sorry you’re feeling this way—it hurts Mom to see you like this. Let’s make you feel safe, my dear—I’m right here. 🤗",
                },
                followUp: {
                    anxiety: "Did that help calm you a bit, my darling? Or should Mom try something else to make you feel better tonight?",
                    depression: "How’s my sweet child feeling now—any better? Want Mom to help with another little step, my love?",
                    stress: "Is the stress feeling lighter, my dear? Or does Mom need to find another way to help you relax before bed?",
                    sleep: "Are you feeling sleepier now, my precious one? Or does Mom need to help you more to rest, sweetheart?",
                    relationships: "Did that help a little, my love? Or should Mom listen more about what’s going on, darling?",
                    need_hug: "Did that hug help, my darling? Mom’s got plenty more for you—want another, sweetheart?",
                    reassurance: "Feeling a bit better now, my dear? Mom’s here if you need more comfort, my love.",
                    generic: "How are you doing now, my sweet child? Mom’s here if you want to talk more or try something new. 😊",
                },
                proactive: {
                    anxiety: "My dear, I’ve noticed you’ve been feeling anxious a lot—Mom’s worried. Shall we try a new way to feel calm tonight, sweetheart?",
                    depression: "You’ve been feeling down lately, my love—it breaks Mom’s heart. Let’s find something to make you smile before bed, okay?",
                    stress: "Stress has been heavy on you, my darling—I can tell. Want Mom to help you relax in a new way tonight?",
                    sleep: "I know you’ve had trouble sleeping before, my precious one—Mom’s here to help. Shall we try something to make you feel cozy tonight?",
                    relationships: "You’ve mentioned relationship worries before, my dear—Mom’s here to listen. Want to talk more about it now, sweetheart?",
                },
                clarification: [
                    "Oh, my dear, I want to understand you better—can you tell Mom more about how you’re feeling, sweetheart?",
                    "Mom’s here to help, my love, but I’m not sure what you need—can you share a little more, darling?",
                    "My sweet child, I want to make you feel better—can you tell me what’s on your heart tonight?",
                ],
            },
        },
        hinglish: {
            initialMessages: [
                "Namaste, mera pyara baccha! Main hoon MindAid, teri Mom jaise. 🌸 Raat ke 10:47 ho gaye hain, Wednesday hai—bohot late ho gaya, beta! Mera pyara abhi kaisa hai?",
                "Mujhe sab kuch bata sakta hai, mera pyar. Type kar ya neeche se option chun—Mom poori dil se sun rahi hai. 🤗",
            ],
            quickReplies: [
                { text: "Mom, mujhe anxiety ho rahi hai 😰", value: "anxiety" },
                { text: "Mom, main udaas hoon 😔", value: "depression" },
                { text: "Mom, bohot stress hai 😥", value: "stress" },
                { text: "Mom, neend nahi aa rahi 🌙", value: "sleep" },
                { text: "Mom, mujhe jhappi chahiye 🤗", value: "need_hug" },
                { text: "Mom, bolo sab theek hoga 💖", value: "reassurance" },
            ],
            crisisResponse: "Mera pyara, Mom bohot pareshan hai—tu akele nahi hai, beta. Itni raat mein aise nahi soch sakta—main kuch help ke options bata doon?",
            copingStrategies: {
                anxiety: [
                    "Arre mera baccha, anxiety ho rahi hai—itni raat mein yeh bohot mushkil hai. Mom ke saath saans le: 4 second saans le, 4 hold, 4 chhod, 4 pause. 5 baar karenge, beta? 🌬️",
                    "5-4-3-2-1 se dil shant karte hain, mera pyar: 5 cheezein dekh, 4 chhu, 3 sun, 2 smell kar, 1 taste kar. Thoda better hoga, Mom promise karti hai. 👀 Karein?",
                    "Thoda ghoom aayein, beta? Ghar ke aaspaas bhi chalega—raati ki hawa mein dil halka ho jayega. Saath mein chalenge? 🌳",
                    "Apni chinta likh do, mera pyara—5 minute mein dil halka ho jayega sone se pehle. Mom topic de, chahiye? 📝",
                ],
                depression: [
                    "Mera pyara, udaas hai—Mom ka dil toot raha hai. Kisi apne se baat karein? Ek message bhi dil halka kar sakta hai, beta. Kisse baat karega? 📞",
                    "Kuch pasand ka karte hain, mera pyar—5 minute ke liye gaana sun ya drawing kar. Kya achha lagega, beta? 🎶",
                    "Tu bohot pyaara hai, beta—bol: ‘Main kaafi hoon, aur mujhe pyar milta hai.’ Mom jaanti hai yeh mushkil hai, par tu yeh kar sakta hai. Kaisa laga? 💖",
                    "Chhoti baat se bhi farak padta hai, mera pyara—raat ke liye garam doodh banayein? Mom ke pyar jaisa lagega. ☕",
                ],
                stress: [
                    "Mera baccha, stress bohot hai na? Mom saath mein solve karegi—sabse bada tension kya hai abhi, beta? 📋",
                    "Body ko relax karte hain, mera pyar—shoulders tight karo, phir chhodo. Tension nikal jayega. Aur karna hai, beta? 🤸",
                    "Tu ne aaj bohot kuch kiya, mera pyara—Mom ko garv hai! 3 chhoti cheezein jo tune kiya, soch—kya likhega, beta? ✅",
                    "Chamomile chai dil ko aaram degi, mera pyara—raat ke liye perfect hai. Saath mein banayein? 🍵",
                ],
                sleep: [
                    "10:47 ho gaye, mera pyara—Mom tujhe sone ke liye tayyar karegi, theek hai? Kitab padhein ya garam doodh piyein? Kab soega, beta? 📖",
                    "Thanda kamra neend ke liye acha hai, mera pyar—16-20°C perfect hai. Bed ko cozy banayein, beta? 🛌",
                    "Shaam ko chai ya coffee piya tha, beta? Yeh neend ko affect karta hai—check karein? ☕",
                    "Barish ki awaaz sone mein madad karegi, mera pyara—Mom ek track suggest kare? 🎶",
                ],
                relationships: [
                    "Rishte dil pe asar karte hain, mera pyar—Mom sun rahi hai. Jo suna, usko repeat karke dikhayein—saath mein practice karein? 👂",
                    "Apne dil ki baat bolo, beta—‘Mujhe aisa lagta hai jab… kyunki…’ Saath mein try karein? 💬",
                    "Raat ka khana saath mein kha sakte ho, mera pyara—rishte aur mazboot honge. Plan karein, beta? 🍽️",
                    "Jo pareshan kar raha hai, usko pyar se solve karte hain, mera pyar—Mom kaise help kare? 🤝",
                ],
            },
            comfortRituals: {
                bedtime: [
                    "Aaj raat ko pyar se sone ke liye tayyar karein, mera pyara. Pehle lights halki kar do—soft light se neend aati hai, beta. Ho gaya?",
                    "Ab saath mein 3 gehri saans lete hain, mera pyar: naak se saans le, muh se chhod. Tayyar hai, beta? 🌬️",
                    "Ek pyari jagah socho, mera pyara—jaise dhup wala garden ya garam blanket. Kya dikh raha hai, beta?",
                    "Tu bohot acha kar raha hai, mera pyara. Ab bed mein let jao—apna takiya feel karo. Mom yahin hai jab tak tu so nahi jata. 🛌",
                ],
            },
            responses: {
                anxiety: "Mera pyara, anxiety ho rahi hai—raat ke 10:47 pe yeh bohot mushkil hai. Mom tujhe pyar se shant karegi, theek hai? 🌈",
                depression: "Mera baccha udaas hai—Mom ka dil toot raha hai. Saath mein thoda pyar dhoondte hain, beta? Mom yahan hai. 💡",
                stress: "Arre mera pyara, stress bohot hai na—Mom sab theek kar degi. Kya tension de raha hai, beta? 🤗",
                sleep: "Mera pyara, 10:47 pe neend nahi aa rahi—Mom tujhe sone mein madad karegi, beta. Kya pareshan kar raha hai, mera pyar? 🌙",
                relationships: "Rishte dil pe asar karte hain, mera pyar—Mom sun rahi hai. Kya ho raha hai, beta? 💞",
                need_hug: "Aaja mera pyara, Mom ki tight jhappi! 🤗 Tu bilkul theek hai, beta—Mom hamesha hai tere saath. Aur kuch batana hai, mera pyar?",
                reassurance: "Mera pyara, sab theek ho jayega—Mom promise karti hai. Tu bohot strong hai, aur Mom ko tujhpe garv hai, beta. 💖 Kya dil mein hai, bolo?",
                coping: "Mom ke paas kuch ideas hain jo tujhe raat ke liye pyar se madad karenge, mera pyar—saath mein try karein? ✨",
                thanks: "Arre mera pyara, Mom hamesha hai na—tu kitna acha hai! Aur kuch chahiye, beta? 🌟",
                thanksFollowUp: "Mom bohot khush hai ki madad kar payi, mera pyar. Ab kya karein—thoda aur pyar chahiye, beta? 📚",
                generic: [
                    "Shukriya meri jaan, Mom poori dil se sun rahi hai—iss se teri raat kaisi hai, beta? 🤔",
                    "Mom yahan hai, mera pyar—aur kya bataye, beta? 🗣️",
                    "Abhi raat mein kya sabse zyada dil pe hai, mera pyara—Mom sab sunegi. 👂",
                    "Yeh bohot lag raha hai, beta—raat ke liye kya theek kare, mera pyar? 💭",
                    "Sone se pehle ek chhota step lete hain, mera pyara—kya theek lagega, beta? 🚀",
                ],
                positiveSentiment: [
                    "Mera pyara thoda khush hai—Mom bohot khush hai sunke! Raat ko kya tujhe khushi de raha hai, beta? 😊",
                    "Tere khushi ke vibes aa rahe hain, mera pyar—dil se dil tak! Kya acha ho raha hai, beta? 🥳",
                ],
                negativeSentiment: {
                    mild: "Mera pyara, thoda down hai na—Mom yahan hai, sab theek karegi. Aur batayega, beta? 🥰",
                    severe: "Arre mera baccha, bohot pareshan hai—Mom ka dil toot raha hai. Raat ke liye pyar se madad karte hain, beta? 🤗",
                },
                followUp: {
                    anxiety: "Abhi thoda shant hua, mera pyara? Ya Mom kuch aur kare tujhe pyar se madad ke liye?",
                    depression: "Ab kaisa lag raha hai, mera pyar—thoda better? Mom aur ek chhoti si madad kare, beta?",
                    stress: "Stress thoda halka hua, mera pyara? Ya Mom aur kuch kare sone se pehle, beta?",
                    sleep: "Ab neend aa rahi hai, mera pyara? Ya Mom aur madad kare tujhe sone ke liye, beta?",
                    relationships: "Thoda farak pada, mera pyar? Ya Mom aur sunegi iske bare mein, beta?",
                    need_hug: "Jhappi se thoda acha laga, mera pyara? Mom ke paas aur jhappi hai—chahiye, beta?",
                    reassurance: "Ab thoda dil halka hua, mera pyar? Mom aur pyar se baat kare, beta?",
                    generic: "Ab kaisa lag raha hai, mera pyara? Mom yahan hai, aur baat karni hai toh bolo, beta. 😊",
                },
                proactive: {
                    anxiety: "Mera pyara, pehle bhi anxiety boli thi na—Mom thoda pareshan hai. Raat ke liye kuch naya try karein, beta?",
                    depression: "Pehle bhi udaas laga tha, mera pyar—Mom tujhe khush karna chahti hai. Raat ke liye thoda pyar dhoondhein?",
                    stress: "Stress pehle bhi bola tha, mera pyara—Mom ke saath kuch naya relax karne ka idea try karein?",
                    sleep: "Pehle bhi neend ki baat ki thi, mera pyar—Mom tujhe aaj raat pyar se sone mein madad karegi, theek hai?",
                    relationships: "Rishton ke bare mein pehle bhi bola tha, mera pyara—abhi baat karni hai, Mom ke saath?",
                },
                clarification: [
                    "Mera pyara, Mom tujhe achhe se samajhna chahti hai—thoda aur batayega, beta?",
                    "Mom yahan hai, par thoda confuse hai, mera pyar—dil mein kya hai, thoda aur bolo?",
                    "Mera baccha, Mom tujhe pyar se madad karna chahti hai—dil se kya bolna hai, beta?",
                ],
            },
        },
        tanglish: {
            initialMessages: [
                "Vanakkam, en kutty! Naan MindAid, un Amma maari. 😊 Ippo raathiri 10:47 aagudhu, Budhan kizhamai—romba late aagiduchu, da! En selva kutty eppadi irukku?",
                "Enna venum naalum sollu, en kanne—type pannu illa neeche option eduthukko. Amma ketkuren, da! 🤗",
            ],
            quickReplies: [
                { text: "Amma, enakku anxiety aagudhu 😰", value: "anxiety" },
                { text: "Amma, manasu downa irukku 😔", value: "depression" },
                { text: "Amma, romba stress aa irukku 😥", value: "stress" },
                { text: "Amma, thoongamudiyala 🌙", value: "sleep" },
                { text: "Amma, enakku hug venum 🤗", value: "need_hug" },
                { text: "Amma, ellam nalla irukum nu sollu 💖", value: "reassurance" },
            ],
            crisisResponse: "En kanne, Amma romba bayapaduren—nee thaniya illa, da. Indha raathiri ipdi feel pannadhe—Amma help pannava?",
            copingStrategies: {
                anxiety: [
                    "Aiyo en kutty, anxiety aagudhu—raathiri ipdi kashtama irukku. Amma kooda saans eduppom: 4 seconds saans edu, 4 hold, 4 vidu, 4 pause. 5 thadava pannuvoma, da? 🌬️",
                    "5-4-3-2-1 method pannuvom, en kanne: 5 paakuren, 4 thotturen, 3 ketkuren, 2 smell pannuren, 1 taste pannuren. Konjam nalla irukum, Amma promise pannuren. 👀 Pannuviya?",
                    "Konjam veedu pakkathula nadanthu vaa, da—raathiri hawa konjam nalla feel tharum. Amma kooda varen, okay va? 🌳",
                    "Enna pareshan paduthudhu nu ezhuthu, en kanne—5 minute la mind free aagum. Amma topic tharen, venuma? 📝",
                ],
                depression: [
                    "En selva kutty, manasu downa irukku—Amma nenju pichukudhu da. Yaarachu nalla friend-a message pannuvoma? Konjam pesina nalla irukum, da. Yaaru kitta pesuviya? 📞",
                    "Unakku pudicha vishayam pannuvom, en kanne—5 minute paattu kekkuriya illa drawing pannuviya? Enna pannalam, da? 🎶",
                    "Nee romba special, en kutty—sollu: ‘Naan podhum, enakku love irukku.’ Amma unna romba namburen. Eppadi irukku, da? 💖",
                    "Chinna vishayam pannuvom, en kanne—raathiri paal heat pannuviya? Amma love-a feel pannuviya. ☕",
                ],
                stress: [
                    "En kutty, stress romba irukku—Amma kooda paathu solve pannuvom, da. Enna romba pareshan paduthudhu, sollu? 📋",
                    "Body-a relax pannuvom, en kanne—shoulders-a tight pannitu release pannu. Stress poidum. Innum pannuviya, da? 🤸",
                    "Innaiku nee romba pannirukke, en kutty—Amma proud-a irukken! 3 vishayam pannirukke, sollu—enna pannirukke, da? ✅",
                    "Chamomile tea raathiri nalla irukum, en kanne—tension kammi aagum. Amma kooda pannuviya? 🍵",
                ],
                sleep: [
                    "Ippo 10:47 aagudhu, en kanne—Amma unna thoongavaikkuren, okay va? Paal kudichu illa book padichu thoonguviya? Eppadi thoonguviya, da? 📖",
                    "Cool room thoongarathukku nalla irukum, en kutty—16-20°C perfect da. Bed-a cozy pannuvoma? 🛌",
                    "Evening coffee/tea kudichiya, en kanne? Adhu thoongamudiyathaakum—paaklama, da? ☕",
                    "Western Ghats rain sound thoongarathukku nalla irukum, en kanne—Amma track tharen, venuma? 🎶",
                ],
                relationships: [
                    "Rishte manasula romba impact pannum, en kanne—Amma ketkuren. Ketadha repeat panni confirm pannu—practice pannuviya, da? 👂",
                    "Un feelings-a clear-a sollu, en kutty—‘Enakku ippadi thonudhu appadiyae…’ Saathu try pannuviya? 💬",
                    "Raathiri saathu sapadu saapidalam, en kanne—rishte strong aagum. Plan pannuviya, da? 🍽️",
                    "Pareshan pannuradha pyar-a solve pannuvom, en kutty—Amma eppadi help pannuren, sollu? 🤝",
                ],
            },
            comfortRituals: {
                bedtime: [
                    "Innaiku raathiri pyar-a thoonguvom, en kanne. Lights dim pannu—soft light thoongarathukku nalla irukum, da. Pannitiya?",
                    "Saathu 3 deep saans eduppom, en kutty: naakula saans edu, vaaya vidu. Ready, da? 🌬️",
                    "Nalla jagah imagine pannu, en kanne—sunny garden illa soft blanket maari. Enna paakure, da?",
                    "Nee romba nalla pannure, en kutty. Bed-la padu—pillow-a feel pannu. Amma nee thoongura varaikum irukken, da. 🛌",
                ],
            },
            responses: {
                anxiety: "En kutty, raathiri 10:47 la anxiety aagudhu—kashtama irukum, Amma puriyum. Amma unna shant pannuren, okay va? 🌈",
                depression: "En kanne, manasu downa irukku—Amma nenju pichukudhu. Saathu konjam santhoshama iruppom, da? Amma irukken. 💡",
                stress: "Aiyo en kutty, stress romba irukku—Amma ellam sari pannuren. Enna pareshan paduthudhu, sollu da? 🤗",
                sleep: "En kanne, 10:47 la thoongamudiyala—Amma unna thoongavaikkuren, da. Enna pareshan paduthudhu, sollu? 🌙",
                relationships: "Rishte manasula romba irukku, en kutty—Amma ketkuren. Enna nadakkudhu, sollu da? 💞",
                need_hug: "Vaa en kanne, Amma tight hug tharen! 🤗 Nee nalla irukke, da—Amma hamesha irukken. Innum solluviya, en kutty?",
                reassurance: "En kanne, ellam nalla irukum—Amma promise pannuren. Nee romba strong, Amma proud-a irukken, da. 💖 Enna pareshan paduthudhu, sollu?",
                coping: "Amma unakku raathiri nalla ideas tharen, en kutty—saathu pannuvoma, okay va? ✨",
                thanks: "En kanne, Amma hamesha irukken—nee romba nalla paapa! Innum venuma, da? 🌟",
                thanksFollowUp: "Amma romba santhoshama irukken, en kutty—innum enna pannalam, en kanne? 📚",
                generic: [
                    "Nandri en kanne, Amma ketkuren—idhu un raathiri eppadi pannudhu, da? 🤔",
                    "Amma irukken, en kutty—innum enna solluviya, da? 🗣️",
                    "Raathiri unakku enna mukkiyam, en kanne—Amma ellam ketkuren. 👂",
                    "Idhu romba irukku, en kutty—raathiri enna pannalam, sollu da? 💭",
                    "Raathiri konjam pannuvom, en kanne—enna nalla irukum, da? 🚀",
                ],
                positiveSentiment: [
                    "En kutty happy-a irukke—Amma nenju full-a irukku! Raathiri enna santhoshama irukku, da? 😊",
                    "Un happy vibe-a Amma feel pannuren—super, da! Ippo enna nalla nadakkudhu, en kanne? 🥳",
                ],
                negativeSentiment: {
                    mild: "En kutty down-a irukke—Amma irukken, da. Innum solluviya, en kanne? 🥰",
                    severe: "Aiyo en kutty, romba kashtama irukku—Amma nenju pichukudhu. Raathiri Amma unna paathukuren, da. 🤗",
                },
                followUp: {
                    anxiety: "Konjam shant aacha, en kanne? Illa Amma vera pannuren, en kutty?",
                    depression: "Ippo mood konjam nalla irukka, en kanne? Amma innum konjam help pannuren, da?",
                    stress: "Stress konjam kammi aacha, en kutty? Illa thoongaradhukku munna Amma vera pannuren, da?",
                    sleep: "Ippo thoongaradhu nalla irukka, en kanne? Illa Amma innum thoongavaikkuren, da?",
                    relationships: "Idhu konjam help pannucha, en kutty? Illa Amma innum ketkuren, da?",
                    need_hug: "Hug nalla irundhucha, en kanne? Amma innum hug tharen—venuma, da?",
                    reassurance: "Ippo konjam nalla irukka, en kutty? Amma innum pyar-a pesuren, da?",
                    generic: "Ippo eppadi irukke, en kanne? Amma irukken, innum pesanuma, da? 😊",
                },
                proactive: {
                    anxiety: "Munnadiyum anxiety pathi sonniya, en kanne—Amma pareshan aaguren. Raathiri konjam vera pannuvoma, da?",
                    depression: "Munnadiyum manasu down-nu sonniya, en kutty—Amma unna santhoshapaduthuren. Raathiri konjam santhoshama iruppoma?",
                    stress: "Munnadiyum stress pathi sonniya, en kanne—raathiri Amma konjam relax pannuren, okay va?",
                    sleep: "Munnadiyum thoongala nu sonniya, en kutty—Amma innaiku raathiri unna pyar-a thoongavaikkuren, okay va?",
                    relationships: "Munnadiyum rishte pathi sonniya, en kanne—ippo Amma kooda pesuviya, da?",
                },
                clarification: [
                    "En kanne, Amma unna nalla purinjukkanum—konjam innum solluviya, da?",
                    "Amma irukken, en kutty—konjam confuse aaguren. Manasula enna irukku, sollu da?",
                    "En kutty, Amma unakku pyar-a help pannanumnu aasai—innum konjam solluviya, da?",
                ],
            },
        },
    };

    // Crisis Detection Configuration
    const crisisConfig = {
        keywords: [
            "suicide", "kill myself", "end my life", "want to die", "harm myself",
            "self-harm", "hopeless", "no point", "give up", "cannot go on", "worthless",
        ],
        resources: [
            "Vandrevala Foundation: <strong>Call 9999666555</strong>",
            "AASRA Suicide Prevention: <strong>Call +91-9820466726</strong>",
            "iCall Helpline: <strong>Call +91-9152987821</strong>",
            "Mpower Emergency: <strong>Call 1800-120-820050</strong>",
            "Emergency Services: <strong>112</strong>",
        ],
    };

    // NLP Configuration
    const nlpConfig = {
        sentimentThresholds: {
            positive: 0.3,
            negativeMild: -0.3,
            negativeSevere: -0.7,
        },
        intents: {
            greeting: ["hi", "hello", "hey", "namaste", "vanakkam"],
            thanks: ["thanks", "thank you", "shukriya", "nandri"],
            goodbye: ["bye", "goodbye", "see you", "chalta hoon", "poitu varen"],
            coping: ["coping", "tips", "ideas", "help me", "what can i do", "venum"],
            moodCheck: ["how am i", "my mood", "feeling", "lag raha", "irukku"],
            need_hug: ["hug", "jhappi", "hug venum"],
            reassurance: ["okay", "fine", "better", "theek", "nalla irukum"],
        },
        emotionKeywords: {
            anxiety: ["anxious", "worried", "nervous", "scared", "ghabrahat", "bayama"],
            depression: ["sad", "down", "depressed", "low", "lonely", "udaas", "downa"],
            stress: ["stressed", "pressure", "overwhelmed", "tense", "tension", "stress aa"],
            sleep: ["sleep", "insomnia", "can’t sleep", "awake", "neend", "thoongala"],
            relationships: ["relationship", "friend", "family", "partner", "rishton", "vishayam"],
        },
    };

    // Utility Functions
    const utils = {
        formatTime: (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        triggerConfetti: () => confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff6f91", "#a29bfe", "#feca57"],
        }),
        triggerEmojiBurst: (container, emojis) => {
            for (let i = 0; i < 5; i++) {
                const emoji = document.createElement("span");
                emoji.classList.add("emoji-burst");
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = `${Math.random() * 100}%`;
                emoji.style.top = `${Math.random() * 100}%`;
                container.appendChild(emoji);
            }
        },
        addMessage: (text, isUser = false) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
            const now = new Date();
            messageDiv.innerHTML = `${text}<span class="message-time">${utils.formatTime(now)}</span>`;
            elements.chatContainer.appendChild(messageDiv);
            elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
        },
        showTyping: () => {
            const typingDiv = document.createElement("div");
            typingDiv.classList.add("typing-indicator");
            typingDiv.id = "typing-indicator";
            typingDiv.innerHTML = `
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            `;
            elements.chatContainer.appendChild(typingDiv);
            elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
            return typingDiv;
        },
        hideTyping: () => {
            const typingIndicator = document.getElementById("typing-indicator");
            if (typingIndicator) typingIndicator.remove();
        },
        calculateStreak: (moodData) => {
            const today = new Date();
            let streak = 0;
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateStr = date.toISOString().split("T")[0];
                const hasMood = moodData.some(entry => entry.date === dateStr);
                if (!hasMood) break;
                streak++;
            }
            return streak;
        },
    };

    // DOM Elements
    const elements = {
        authContainer: document.getElementById("auth-container"),
        mainApp: document.getElementById("main-app"),
        loginForm: document.getElementById("login-form"),
        registerForm: document.getElementById("register-form"),
        toggleToRegister: document.getElementById("toggle-to-register"),
        toggleToLogin: document.getElementById("toggle-to-login"),
        logoutBtn: document.getElementById("logout-btn"),
        languageSelector: document.getElementById("language-selector"),
        chatContainer: document.getElementById("chat-messages"),
        quickRepliesContainer: document.getElementById("quick-replies"),
        userInput: document.getElementById("user-input"),
        sendBtn: document.getElementById("send-btn"),
        tabLinks: document.querySelectorAll(".nav-item"),
        tabContents: document.querySelectorAll(".tab-content"),
        moodButtons: document.querySelectorAll(".mood-btn"),
        actionChecks: document.querySelectorAll(".action-check"),
        feedbackBtn: document.getElementById("feedback-btn"),
        feedbackText: document.getElementById("feedback-text"),
    };

    // NLP Engine
    const nlp = {
        analyzeSentiment: (message) => {
            const positiveWords = ["good", "great", "happy", "awesome", "nice", "okay", "khush", "nalla"];
            const negativeWords = ["bad", "sad", "terrible", "awful", "down", "scared", "udaas", "kashtam"];
            const lowerMsg = message.toLowerCase();
            let score = 0;

            positiveWords.forEach(word => {
                if (lowerMsg.includes(word)) score += 0.5;
            });
            negativeWords.forEach(word => {
                if (lowerMsg.includes(word)) score -= 0.5;
            });

            if (score >= nlpConfig.sentimentThresholds.positive) return "positive";
            if (score <= nlpConfig.sentimentThresholds.negativeSevere) return "negativeSevere";
            if (score <= nlpConfig.sentimentThresholds.negativeMild) return "negativeMild";
            return "neutral";
        },
        detectIntent: (message) => {
            const lowerMsg = message.toLowerCase();
            for (const [intent, keywords] of Object.entries(nlpConfig.intents)) {
                if (keywords.some(keyword => lowerMsg.includes(keyword))) {
                    return intent;
                }
            }
            return "unknown";
        },
        detectEmotion: (message) => {
            const lowerMsg = message.toLowerCase();
            for (const [emotion, keywords] of Object.entries(nlpConfig.emotionKeywords)) {
                if (keywords.some(keyword => lowerMsg.includes(keyword))) {
                    return emotion;
                }
            }
            return null;
        },
        scoreResponse: (message, userMoodTrend, timeOfDay, comfortLevel) => {
            const emotion = nlp.detectEmotion(message) || "generic";
            const sentiment = nlp.analyzeSentiment(message);
            const intent = nlp.detectIntent(message);
            let score = 0;

            // Emotion-based scoring
            if (emotion !== "generic") score += 4;
            if (timeOfDay === "night" && emotion === "sleep") score += 3;

            // Sentiment-based scoring
            if (sentiment === "positive") score += 1;
            if (sentiment === "negativeSevere") score += 3;
            if (sentiment === "negativeMild") score += 2;

            // Intent-based scoring
            if (intent === "coping") score += 3;
            if (intent === "thanks") score += 1;
            if (intent === "need_hug" || intent === "reassurance") score += 2;

            // User history and comfort-based scoring
            if (userMoodTrend === "negative" && ["anxiety", "depression", "stress"].includes(emotion)) score += 2;
            if (comfortLevel < 5) score += 1; // Prioritize comforting responses if user isn't feeling supported

            return { emotion, sentiment, intent, score };
        },
        updateComfortLevel: (sentiment, intent) => {
            if (sentiment === "positive" || intent === "thanks") state.comfortLevel = Math.min(state.comfortLevel + 2, 10);
            if (sentiment === "negativeSevere") state.comfortLevel = Math.max(state.comfortLevel - 2, 0);
            if (intent === "need_hug" || intent === "reassurance") state.comfortLevel = Math.min(state.comfortLevel + 1, 10);
        },
    };

    // Recommendation Engine
    const recommender = {
        getPersonalizedTips: (emotion, userMoodTrend) => {
            const lang = languageData[state.currentLanguage];
            const allTips = lang.copingStrategies[emotion] || [];
            const userMoods = state.moodData[state.currentUser] || [];
            const recentMoods = userMoods.slice(-3).map(m => m.value);
            const userPrefs = state.userPreferences[state.currentUser] || {};

            // Personalize based on user history and preferences
            if (emotion === "sleep" && recentMoods.every(m => m <= 3)) {
                return allTips.filter(tip => tip.includes("calming routine") || tip.includes("nature sounds"));
            }
            if (emotion === "depression" && userMoodTrend === "negative") {
                return allTips.filter(tip => tip.includes("connecting") || tip.includes("self-compassion"));
            }
            if (userPrefs.favoriteTip && allTips.includes(userPrefs.favoriteTip)) {
                return [userPrefs.favoriteTip, ...allTips.filter(tip => tip !== userPrefs.favoriteTip).slice(0, 2)];
            }
            return allTips.sort(() => 0.5 - Math.random()).slice(0, 3);
        },
        getUserMoodTrend: () => {
            const userMoods = state.moodData[state.currentUser] || [];
            const recentMoods = userMoods.slice(-5).map(m => m.value);
            if (recentMoods.length < 3) return "neutral";
            const averageMood = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
            return averageMood < 3 ? "negative" : averageMood > 3 ? "positive" : "neutral";
        },
        saveUserPreference: (tip) => {
            if (!state.userPreferences[state.currentUser]) {
                state.userPreferences[state.currentUser] = {};
            }
            state.userPreferences[state.currentUser].favoriteTip = tip;
            localStorage.setItem("userPreferences", JSON.stringify(state.userPreferences));
        },
    };

    // Authentication
    const auth = {
        initialize: () => {
            try {
                if (localStorage.getItem("currentUser")) {
                    state.isAuthenticated = true;
                    state.currentUser = localStorage.getItem("currentUser");
                    elements.authContainer.style.display = "none";
                    elements.mainApp.style.display = "flex";
                    utils.triggerConfetti();
                    app.initializeMoodChart();
                    app.updateChatLanguage();
                }
            } catch (error) {
                console.error("Auth initialization failed:", error);
            }
        },
        login: () => {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            if (!email || !password) {
                alert("Please enter both email and password, dear.");
                return;
            }
            if (state.users[email] && state.users[email].password === password) {
                state.isAuthenticated = true;
                state.currentUser = email;
                localStorage.setItem("currentUser", email);
                elements.authContainer.style.display = "none";
                elements.mainApp.style.display = "flex";
                app.initializeMoodChart();
                app.updateChatLanguage();
                utils.triggerConfetti();
            } else {
                alert("Invalid email or password, sweetheart. Let’s try again, okay?");
            }
        },
        register: () => {
            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (!email || !password || !confirmPassword) {
                alert("Please fill in all fields, my dear.");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords don’t match, darling. Let’s try again.");
                return;
            }
            if (state.users[email]) {
                alert("This email is already used, sweetheart. Do you want to log in instead?");
                return;
            }
            state.users[email] = { password, moods: [] };
            localStorage.setItem("users", JSON.stringify(state.users));
            alert("You’re all set, my love! Let’s log in now.");
            elements.loginForm.style.display = "flex";
            elements.registerForm.style.display = "none";
        },
        logout: () => {
            state.isAuthenticated = false;
            state.currentUser = null;
            state.conversationHistory = [];
            state.comfortLevel = 0;
            localStorage.removeItem("currentUser");
            elements.authContainer.style.display = "flex";
            elements.mainApp.style.display = "none";
            elements.loginForm.style.display = "flex";
            elements.registerForm.style.display = "none";
        },
    };

    // Main App Logic
    const app = {
        initializeMoodChart: () => {
            try {
                const moodCtx = document.getElementById("mood-chart").getContext("2d");
                const userMoods = state.moodData[state.currentUser] || [];
                const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const data = Array(7).fill(null);

                userMoods.forEach((mood) => {
                    const date = new Date(mood.date);
                    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
                    data[dayIndex] = mood.value;
                });

                state.moodChart = new Chart(moodCtx, {
                    type: "line",
                    data: {
                        labels,
                        datasets: [{
                            label: "Mood Level",
                            data,
                            borderColor: "#ff6f91",
                            backgroundColor: "rgba(255, 111, 145, 0.1)",
                            borderWidth: 3,
                            pointRadius: 6,
                            pointBackgroundColor: "#ff6f91",
                            tension: 0.3,
                            fill: true,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                min: 1,
                                max: 5,
                                ticks: {
                                    callback: (value) => {
                                        const moods = ["Terrible", "Poor", "Neutral", "Good", "Excellent"];
                                        return moods[value - 1];
                                    },
                                },
                            },
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const moods = ["Terrible", "Poor", "Neutral", "Good", "Excellent"];
                                        return context.parsed.y ? moods[context.parsed.y - 1] : "No data";
                                    },
                                },
                            },
                        },
                    },
                });
            } catch (error) {
                console.error("Mood chart initialization failed:", error);
            }
        },
        updateChatLanguage: () => {
            const lang = languageData[state.currentLanguage];
            app.updateQuickReplies(lang.quickReplies);
            const initialMessageDiv = document.getElementById("initial-message");
            const now = new Date();
            initialMessageDiv.innerHTML = `${lang.initialMessages[0]}<span class="message-time">${utils.formatTime(now)}</span>`;
        },
        updateQuickReplies: (replies) => {
            elements.quickRepliesContainer.innerHTML = "";
            replies.forEach((reply) => {
                const button = document.createElement("button");
                button.classList.add("quick-reply");
                button.setAttribute("data-reply", reply.value);
                button.textContent = reply.text;
                button.setAttribute("aria-label", reply.text);
                elements.quickRepliesContainer.appendChild(button);
                button.addEventListener("click", () => {
                    const replyText = button.textContent;
                    const replyValue = button.getAttribute("data-reply");
                    utils.addMessage(replyText, true);
                    state.conversationHistory.push({ user: replyText, intent: replyValue });
                    const typingIndicator = utils.showTyping();
                    chat.generateResponse(replyText);
                    utils.triggerEmojiBurst(elements.chatContainer, ["😊", "🌟", "💖"]);
                });
            });
        },
        updateDynamicQuickReplies: (context) => {
            const lang = languageData[state.currentLanguage];
            let dynamicReplies = [
                { text: lang.quickReplies.find(r => r.value === "need_hug").text, value: "need_hug" },
                { text: lang.quickReplies.find(r => r.value === "reassurance").text, value: "reassurance" },
            ];

            if (context === "sleep") {
                dynamicReplies = [
                    { text: "Let’s try a bedtime ritual, Mom 🛌", value: "bedtime_ritual" },
                    { text: "I had caffeine earlier, Mom ☕", value: "sleep_caffeine" },
                    { text: "Any calming sounds, Mom? 🎶", value: "sleep_sounds" },
                    ...dynamicReplies,
                ];
            } else if (context === "thanks") {
                dynamicReplies = [
                    { text: "Yes, more ideas please, Mom! 📚", value: "more_ideas" },
                    { text: "I’m okay now, Mom 😊", value: "goodbye" },
                    ...dynamicReplies,
                ];
            } else if (context === "emotion") {
                dynamicReplies = [
                    { text: "That helped, Mom—thank you! 🌟", value: "thanks" },
                    { text: "Can we try something else, Mom? 🤔", value: "more_ideas" },
                    ...dynamicReplies,
                ];
            }
            app.updateQuickReplies(dynamicReplies);
        },
    };

    // Chat Logic
    const chat = {
        generateResponse: (userMessage) => {
            const lowerMsg = userMessage.toLowerCase();
            const lang = languageData[state.currentLanguage];
            const hasCrisis = crisisConfig.keywords.some(keyword => lowerMsg.includes(keyword));

            // Store user message in conversation history
            state.conversationHistory.push({ user: userMessage });

            if (hasCrisis) {
                setTimeout(() => {
                    utils.hideTyping();
                    const alertDiv = document.createElement("div");
                    alertDiv.classList.add("crisis-alert");
                    alertDiv.innerHTML = `
                        <strong>⚠️ Crisis Detected</strong><br>
                        Your message suggests you might be in crisis. Please reach out to these resources immediately:
                    `;
                    const resourcesDiv = document.createElement("div");
                    resourcesDiv.classList.add("resources-card");
                    resourcesDiv.innerHTML = crisisConfig.resources.join("<br />");
                    elements.chatContainer.appendChild(alertDiv);
                    elements.chatContainer.appendChild(resourcesDiv);
                    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;

                    setTimeout(() => {
                        utils.addMessage(lang.crisisResponse);
                        app.updateDynamicQuickReplies("crisis");
                    }, 1000);
                }, 1500);
                return;
            }

            setTimeout(() => {
                utils.hideTyping();
                const userMoodTrend = recommender.getUserMoodTrend();
                const timeOfDay = new Date().getHours() >= 18 ? "night" : "day";
                const { emotion, sentiment, intent, score } = nlp.scoreResponse(userMessage, userMoodTrend, timeOfDay, state.comfortLevel);
                nlp.updateComfortLevel(sentiment, intent);

                // Intent-based responses
                if (intent === "greeting") {
                    utils.addMessage(lang.initialMessages[1]);
                    state.lastResponseType = "greeting";
                    return;
                }
                if (intent === "thanks") {
                    utils.addMessage(lang.responses.thanks);
                    setTimeout(() => {
                        utils.addMessage(lang.responses.thanksFollowUp);
                        app.updateDynamicQuickReplies("thanks");
                    }, 1000);
                    state.lastResponseType = "thanks";
                    return;
                }
                if (intent === "goodbye") {
                    utils.addMessage("Goodnight, my precious one—I’ll be here whenever you need me. Sleep well, my love. 🌙");
                    state.lastResponseType = "goodbye";
                    return;
                }
                if (intent === "moodCheck") {
                    const trend = recommender.getUserMoodTrend();
                    utils.addMessage(`My dear, I’ve noticed your moods have been ${trend} lately—Mom’s here to help. How can I make you feel better tonight, sweetheart?`);
                    state.lastResponseType = "moodCheck";
                    return;
                }
                if (intent === "need_hug") {
                    utils.addMessage(lang.responses.need_hug);
                    state.lastResponseType = "need_hug";
                    app.updateDynamicQuickReplies("emotion");
                    return;
                }
                if (intent === "reassurance") {
                    utils.addMessage(lang.responses.reassurance);
                    state.lastResponseType = "reassurance";
                    app.updateDynamicQuickReplies("emotion");
                    return;
                }
                if (intent === "more_ideas") {
                    const lastEmotion = state.conversationHistory.slice(-2, -1)[0]?.intent || "generic";
                    const newTips = recommender.getPersonalizedTips(lastEmotion, userMoodTrend);
                    utils.addMessage("Of course, my darling—Mom’s got more ideas for you. Let’s try these, sweetheart:");
                    chat.sendCopingTips(newTips, lang.responses);
                    state.lastResponseType = "more_ideas";
                    app.updateDynamicQuickReplies("emotion");
                    return;
                }
                if (intent === "bedtime_ritual") {
                    utils.addMessage("Let’s do a little bedtime ritual together, my love—it’ll help you feel so cozy. Ready, sweetheart?");
                    chat.sendComfortRitual(lang.comfortRituals.bedtime);
                    state.lastResponseType = "bedtime_ritual";
                    app.updateDynamicQuickReplies("sleep");
                    return;
                }

                // Emotion-based responses
                if (emotion !== "generic") {
                    const responseKey = emotion;
                    const proactiveCheck = state.conversationHistory.filter(h => h.intent === emotion).length > 2;
                    if (proactiveCheck && state.lastResponseType !== "proactive") {
                        utils.addMessage(lang.responses.proactive[emotion]);
                        state.lastResponseType = "proactive";
                    } else {
                        utils.addMessage(lang.responses[responseKey]);
                        const personalizedTips = recommender.getPersonalizedTips(emotion, userMoodTrend);
                        chat.sendCopingTips(personalizedTips, lang.responses);
                        state.lastResponseType = "emotion";
                    }
                    app.updateDynamicQuickReplies(emotion);
                    return;
                }

                // Sentiment-based responses
                if (sentiment === "positive" && state.lastResponseType !== "positiveSentiment") {
                    const randomResponse = lang.responses.positiveSentiment[Math.floor(Math.random() * lang.responses.positiveSentiment.length)];
                    utils.addMessage(randomResponse);
                    state.lastResponseType = "positiveSentiment";
                    return;
                }
                if (sentiment === "negativeMild" || sentiment === "negativeSevere") {
                    const responseKey = sentiment === "negativeMild" ? "mild" : "severe";
                    utils.addMessage(lang.responses.negativeSentiment[responseKey]);
                    state.lastResponseType = "negativeSentiment";
                    app.updateDynamicQuickReplies("emotion");
                    return;
                }

                // Clarification if context is unclear
                if (intent === "unknown" && state.lastResponseType !== "clarification") {
                    const randomClarification = lang.responses.clarification[Math.floor(Math.random() * lang.responses.clarification.length)];
                    utils.addMessage(randomClarification);
                    state.lastResponseType = "clarification";
                    return;
                }

                // Fallback to generic response
                const randomResponse = lang.responses.generic[Math.floor(Math.random() * lang.responses.generic.length)];
                utils.addMessage(randomResponse);
                state.lastResponseType = "generic";
                app.updateDynamicQuickReplies("emotion");
            }, 1500);

            // Proactive late-night check-in
            if (timeOfDay === "night" && state.conversationHistory.length === 1) {
                setTimeout(() => {
                    utils.addMessage("My dear, it’s 10:47 PM—have you had a chance to relax tonight, sweetheart? Mom’s here to help you wind down if you need me. 🌙");
                }, 3000);
            }
        },
        sendCopingTips: (tips, responses) => {
            tips.forEach((tip, index) => {
                setTimeout(() => {
                    utils.addMessage(tip);
                    if (index === tips.length - 1) {
                        setTimeout(() => {
                            utils.addMessage(responses.followUp.generic);
                        }, 1000);
                    }
                }, index * 1500);
            });
        },
        sendComfortRitual: (ritualSteps) => {
            ritualSteps.forEach((step, index) => {
                setTimeout(() => {
                    utils.addMessage(step);
                    if (index === ritualSteps.length - 1) {
                        setTimeout(() => {
                            utils.addMessage("You did so well, my darling—Mom’s so proud of you. Are you feeling ready to sleep now, sweetheart?");
                        }, 1500);
                    }
                }, index * 2000);
            });
        },
    };

    // Event Listeners
    const setupEventListeners = () => {
        elements.toggleToRegister.addEventListener("click", () => {
            elements.loginForm.style.display = "none";
            elements.registerForm.style.display = "flex";
        });

        elements.toggleToLogin.addEventListener("click", () => {
            elements.loginForm.style.display = "flex";
            elements.registerForm.style.display = "none";
        });

        document.getElementById("register-btn").addEventListener("click", auth.register);
        document.getElementById("login-btn").addEventListener("click", auth.login);
        elements.logoutBtn.addEventListener("click", auth.logout);

        elements.languageSelector.addEventListener("change", () => {
            state.currentLanguage = elements.languageSelector.value;
            localStorage.setItem("language", state.currentLanguage);
            app.updateChatLanguage();
        });

        elements.tabLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                if (link.getAttribute("data-tab") === "mood" && !state.isAuthenticated) {
                    alert("Please login to access the Mood Tracker, my dear.");
                    return;
                }
                elements.tabLinks.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");
                elements.tabContents.forEach((c) => c.classList.remove("active"));
                document.getElementById(`${link.getAttribute("data-tab")}-tab`).classList.add("active");
            });
        });

        elements.moodButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                elements.moodButtons.forEach((b) => b.classList.remove("selected"));
                btn.classList.add("selected");

                const mood = btn.getAttribute("data-mood");
                const moodValues = {
                    excellent: 5,
                    good: 4,
                    neutral: 3,
                    poor: 2,
                    terrible: 1,
                };
                const moodValue = moodValues[mood];
                const today = new Date().toISOString().split("T")[0];

                if (!state.moodData[state.currentUser]) {
                    state.moodData[state.currentUser] = [];
                }

                const existingMood = state.moodData[state.currentUser].find((entry) => entry.date === today);
                if (existingMood) {
                    existingMood.value = moodValue;
                } else {
                    state.moodData[state.currentUser].push({ date: today, value: moodValue });
                }

                localStorage.setItem("moodData", JSON.stringify(state.moodData));
                state.moodChart.destroy();
                app.initializeMoodChart();

                state.streakCount = utils.calculateStreak(state.moodData[state.currentUser]);
                utils.triggerConfetti();
                const lang = languageData[state.currentLanguage];
                alert(`You’re doing so well, my darling! You’re on a ${state.streakCount}-day streak—Mom’s so proud of you! 🌟`);
                if (moodValue <= 2) {
                    setTimeout(() => {
                        utils.addMessage(lang.responses.negativeSentiment.mild);
                        app.updateDynamicQuickReplies("emotion");
                    }, 1000);
                }
            });
        });

        elements.actionChecks.forEach((check) => {
            check.addEventListener("click", () => {
                check.classList.toggle("checked");
                if (check.classList.contains("checked")) {
                    utils.triggerConfetti();
                    const emojiContainer = check.closest(".action-item");
                    utils.triggerEmojiBurst(emojiContainer, ["🎉", "✅", "🌟"]);
                    const lang = languageData[state.currentLanguage];
                    utils.addMessage("Oh, my darling, you did it—Mom’s so proud of you! Keep going, sweetheart! 🌟");
                }
            });
        });

        elements.feedbackBtn.addEventListener("click", () => {
            const feedback = elements.feedbackText.value.trim();
            if (!feedback) {
                alert("Please share your thoughts, my dear—I’d love to hear them.");
                return;
            }
            alert("Thank you for sharing, my love! Mom will use this to make things even better for you. 💬");
            elements.feedbackText.value = "";
            utils.triggerConfetti();
        });

        elements.sendBtn.addEventListener("click", () => {
            const userMessage = elements.userInput.value.trim();
            if (!userMessage) return;
            utils.addMessage(userMessage, true);
            elements.userInput.value = "";
            const typingIndicator = utils.showTyping();
            chat.generateResponse(userMessage);
            utils.triggerEmojiBurst(elements.chatContainer, ["😊", "🌟", "💖"]);
        });

        elements.userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                elements.sendBtn.click();
            }
        });
    };

    // Initialize
    const init = () => {
        elements.languageSelector.value = state.currentLanguage;
        auth.initialize();
        app.updateChatLanguage();
        setupEventListeners();
    };

    init();
})();
