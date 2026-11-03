# GM Tech Solution — Image & Video Prompts

Har asset banake `gm-tech-solution/assets/` folder mein **isi naam se** save karna (file name har prompt ke upar likha hai).
Prompts English mein hain kyunki image/video tools English mein best kaam karte hain.

Style rule (sab images ke liye): clean, premium, minimal, koi text ya logo image ke andar nahi.

---

## 1. Hero — insaan ka haath → `hand-human.png`

- Size: 2000 × 1400 (landscape), **transparent background** (pehle pure white background pe banao, phir remove.bg / Canva se background hatao)

```
Photorealistic human hand and forearm entering from the left side of the frame, reaching to the right with the index finger gently extended, pose inspired by Michelangelo's "Creation of Adam". Natural skin tone, relaxed elegant fingers, soft diffused studio lighting, subtle soft shadows, isolated on a pure white background, ultra sharp detail, high-end tech advertising style, no jewelry, no text.
```

## 2. Hero — robot ka haath → `hand-robot.png`

- Size: 2000 × 1400 (landscape), **transparent background**

```
Photorealistic humanoid robotic hand and forearm entering from the right side of the frame, reaching to the left with the index finger gently extended, mirroring the pose of Michelangelo's "Creation of Adam". Brushed silver and matte white metal, visible precision mechanical joints, fine cables and pistons, soft diffused studio lighting, isolated on a pure white background, ultra sharp detail, high-end tech advertising style, no text, no logos.
```

> Tip: dono haath ek hi tool aur ek hi lighting se banao, taaki match karein. Ungliyan beech mein milne wali height pe honi chahiye.

---

## 3. Dark section video → `tunnel.mp4`

- Size: 1920 × 1080 (16:9), 8–10 seconds, **seamless loop**, koi text nahi, audio nahi chahiye

```
Cinematic, perfectly symmetrical futuristic data-center corridor, camera slowly and smoothly flying forward through the center. Dark navy and black environment, a thin vertical glowing electric-blue light strip running down the exact center, a bright horizontal band of white light across the middle horizon, scattered white bokeh light points and small blue LED panels on both side walls, glossy reflective floor and ceiling. Moody, high contrast, premium sci-fi, slow constant speed, seamless loop, no people, no text.
```

> Agar video tool loop nahi deta, toh bas constant forward motion wala 8 sec clip de do — loop main code mein sambhal lunga.

---

## 4. Service cards — 5 images (black & white)

- Size: har ek 1024 × 1536 (portrait 2:3 — website ke card shape ke sabse kareeb)
- Sabke end mein ye style line lagani hai (consistency ke liye):

```
Black and white photography, high contrast, cinematic studio lighting, deep blacks, shallow depth of field, 85mm lens, premium minimal tech editorial, no text, no logos.
```

### 4a. AI Agents → `card-agents.png`
```
Close-up of a sleek humanoid robot head in side profile, eyes slightly glowing, thoughtful expression, sitting in front of a dark workspace with abstract floating interface panels. [style line]
```

### 4b. Workflow Automations → `card-workflows.png`
```
Macro shot of an industrial robotic arm precisely moving a part along an automated assembly line, interlocking mechanical gears and conveyor in the background, sense of flawless repetitive motion. [style line]
```

### 4c. AI Voice Agents → `card-voice.png`
```
Professional studio condenser microphone in sharp focus, with a smooth abstract sound wave of light flowing out of it into the darkness, dramatic rim lighting. [style line]
```

### 4d. Social Media & Messaging AI → `card-messaging.png`
```
A robotic metal hand holding a modern smartphone, the screen glowing softly with abstract chat bubble shapes floating above it, dark background. [style line]
```

### 4e. Center hero card (brand) → `card-core.png`
```
Abstract close-up of a human hand and a robotic hand almost touching fingertips, a tiny spark of light between them, centered composition. [style line]
```

---

## 5. Logo → `logo.png`

- Size: 1024 × 1024 (square 1:1), pure white background, sirf black — baaki (transparent, white version, favicon) main bana dunga
- Logo mein "GM Tech Solution" naam mat likhwana — AI tools spelling bigaad dete hain; naam website ke font mein hi rahega
- Teeno mein se jo pasand aaye, ek banao. Check: 16px jitna chhota karke bhi pehchaan mein aaye

### A. GM monogram
```
Minimal geometric monogram logo combining the letters "G" and "M" into one single continuous symbol, clean thick strokes with softly rounded terminals, perfectly balanced, centered with generous padding. Solid black on a pure white background, flat vector style, no gradients, no shadows, no 3D, no mockup, no extra text. Modern AI technology brand, Swiss minimalist design, readable even at favicon size.
```

### B. Connection mark (hero ke haathon wala idea)
```
Minimal abstract logo symbol: two bold rounded strokes reaching toward each other from left and right, with a tiny dot of light in the gap between them, representing a human and a machine connecting. Centered with generous padding. Solid black on a pure white background, flat vector style, no gradients, no shadows, no 3D, no mockup, no text. Premium AI technology brand, Swiss minimalist design, readable even at favicon size.
```

### C. Automation node mark
```
Minimal logo symbol of three small circles connected by smooth flowing lines that together form a stylized letter "G", representing AI agents and automated workflows. Centered with generous padding. Solid black on a pure white background, flat vector style, uniform stroke weight, no gradients, no shadows, no 3D, no mockup, no extra text. Modern AI automation brand, Swiss minimalist design, readable even at favicon size.
```

---

## 6. Hero live video (haath side se aakar ungli touch karein)

Dono video ka start frame ek hi hai: `~/Downloads/gm-hero-start-frame.png` (1920 × 1080, ungliyon ke beech chhota gap). Video 1 isi se bana hai, isliye Video 2 bhi isi se banana hai, taaki dono ek hi frame pe judein. Ye site ke asli cut-outs aur orb se bana hai, isme koi text nahi hai.

Site pe aise chalega:

| Site pe time | Kya dikhega | Kahan se |
|---|---|---|
| 0-2s | sirf halo, upar headline | Video 1 ulta |
| 2-6.5s | dono haath side se aate hain, dheere hote hain | Video 1 ulta |
| 6.5-8s | ungliyan touch, phir chhota sa gap | Video 1 ulta |
| 8s ke baad | ungliyan touch, white glow, phir wapas gap; hamesha repeat | Video 2 boomerang loop |

Video 1 ulta isliye: tool end frame nahi leta. Agar AI ko bolein "haath bahar se aao", to woh naye haath bana dega jo site se match nahi karenge. Isliye haath touch se bahar jaate hue banwao, main ffmpeg se ulta kar dunga, aur video bilkul hamare frame pe khatam hoga.

### Video 1 → `hero-enter.mp4` (16:9, 1080p, 8 sec, no audio, motion normal) ✅ PASS (`..._c4cd1343_1080p.mp4`)

```
Image-to-video. Use the uploaded image as the exact first frame. Keep its framing, scale, lighting and colors identical for the whole clip. Locked-off static camera on a tripod: no zoom, no pan, no tilt, no dolly, no shake, no focus change. One continuous 8-second shot with no cuts. Premium minimal tech commercial, calm and elegant.

Scene: on a pure white background, a photorealistic human hand enters from the left edge and a white-and-silver humanoid robotic hand enters from the right edge. Their index fingertips are touching in the center of the frame, inspired by "The Creation of Adam". Behind the fingertips glows a large, soft, blurred pastel rainbow halo (peach, butter yellow, mint, sky blue, periwinkle, lilac).

Motion, second by second:
0-1s: completely still. Exactly the first frame, fingertips touching.
1-2s: the two fingertips separate very slowly, just a few millimeters.
2-6s: both arms glide straight back along one horizontal line, the human hand toward the left edge and the robotic hand toward the right edge, at the same speed, as a perfect mirror of each other. They start slowly and gradually accelerate. The hands keep their exact pose the whole time: no rotation, no wrist bending, no finger movement, same height, same size. It is a pure sideways slide, as if each arm is on a rail. Both hands fully leave the frame through the side edges; no shoulder, body or new arm is ever revealed.
6-8s: only the empty pure white background and the soft pastel halo remain. The halo stays in the same place and slowly swirls clockwise. Nothing else appears.

The background stays flat pure white (#FFFFFF) in every frame, with no grey, no vignette and no shadows. The human hand keeps five natural fingers and real skin texture. The robot hand stays rigid brushed silver and matte white metal with black joints; nothing bends, stretches or melts. Motion blur is minimal and natural.

Do not include: text, letters, logos, watermark, people, faces, bodies, shoulders, extra hands or fingers, hands changing shape, morphing, melting metal, sparks, lightning, electricity, lens flare, particles, smoke, glow at the fingertips, new shadows, background color change, darkening, camera movement, zoom, scene cuts.
```

### Video 2 → `hero-loop.mp4` (16:9, 1080p, 8 sec, no audio, motion low) ⏳ v2

Pehla try (`..._b0920eb3_1080p.mp4`) reject hua: ungliyon ke beech ek kaanch ki goli (pearl) ban gayi, robot ki ungliyon pe peeli neon lines aa gayin, aur halo bahut gehra rainbow ring ban gaya. Isliye v2 mein "pearl" aur robot pe light wali line hata di hai, aur halo ko pale rakhne ko bola hai.

```
Image-to-video. Use the uploaded image as the exact first frame. Keep its framing, scale, lighting and colors identical for the whole clip. Locked-off static camera on a tripod: no zoom, no pan, no tilt, no dolly, no shake, no focus change. One continuous 8-second shot with no cuts. Premium minimal tech commercial, calm and elegant.

Scene: on a pure white background, a photorealistic human hand from the left and a white-and-silver humanoid robotic hand from the right reach toward each other, index fingertips almost touching in the center of the frame, inspired by "The Creation of Adam". Behind them is a very pale, soft, blurred pastel halo.

Motion, second by second:
0-1s: completely still, exactly the first frame.
1-3s: both index fingers move slowly toward each other and the fingertips touch gently in the center of the frame. Only the hands move, and only a little; the forearms stay where they are.
3-5s: at the exact point of contact, a small soft white glow slowly appears, as if a light is being turned on very gently. It is pure white light, about the size of a fingertip, softly fading at its edges.
5-8s: the glow holds steady with a very gentle breathing brightness. All motion eases out and stops completely by 7s. The fingertips stay touching until the last frame.

The halo stays exactly as pale, soft and faint as in the first frame for the whole clip. It only rotates very slowly; it does not become brighter, more colorful or sharper, and no extra rings appear. The robot hand stays exactly as it is: white and silver metal with black joints, with no glow, light streaks or color on it. The human hand keeps five natural fingers and real skin texture. The background stays flat pure white (#FFFFFF) in every frame.

Do not include: a ball, pearl, bubble, sphere or any object between the fingers, yellow or green light, glowing robot fingers, neon lines, light streaks, lightning, electricity, sparks, lens flare, particles, smoke, saturated rainbow rings, text, letters, logos, watermark, extra hands or fingers, fingers merging, morphing, melting metal, new shadows, background color change, camera movement, zoom, scene cuts.
```

> 5 sec wala tool ho to: 0-0.5s still, 0.5-2s ungliyan touch, 2-3.5s white glow aaye, 3.5-5s sab ruk jaaye, ungliyan touch mein.

---

## Checklist

| File | Kahan use hoga | Status |
|---|---|---|
| hand-human.png | Hero, left side | ✅ (cut-out → `hand-human.webp`) |
| hand-robot.png | Hero, right side | ✅ (cut-out → `hand-robot.webp`) |
| tunnel.mp4 | Dark "AI AGENTS / AUTOMATION" section | ✅ (compressed + seamless loop) |
| card-agents.png | Services card fan | ✅ (→ `card-agents.webp`) |
| card-workflows.png | Services card fan | ✅ (→ `card-workflows.webp`) |
| card-voice.png | Services card fan | ✅ (→ `card-voice.webp`) |
| card-messaging.png | Services card fan | ✅ (→ `card-messaging.webp`) |
| card-core.png | Services card fan (center) | ✅ (→ `card-core.webp`) |
| logo (optional) | Navbar + footer + favicon | ✅ (option A, GM monogram → `logo.png`, `favicon.png`) |
| hero-enter.mp4 | Hero intro, haath andar aate hain (desktop) | ✅ PASS (`c4cd1343`), reverse karna baaki |
| hero-loop.mp4 | Hero live loop, touch glow (desktop) | ⏳ v1 reject (`b0920eb3`), v2 prompt ready |
