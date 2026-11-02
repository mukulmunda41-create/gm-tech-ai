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
