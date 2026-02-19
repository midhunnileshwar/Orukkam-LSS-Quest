# Orukkam - LSS Quest: Product Requirements Document (Revamped)

## 1. Core Philosophy: "Kids First, Butter Smooth"
**Goal:** Create an app that feels like a high-quality game, not a homework tool.
**Key Tenets:**
*   **Juicy Interactions:** Every tap must have a reaction (bounce, pop, converting to particles).
*   **Voice-Guided (Auditory):** Since 4th graders vary in reading speed, every instruction must be spoken aloud in friendly Malayalam.
*   **Zero-Lag Transistions:** No loading spinners if possible. Use "Shared Element Transitions" to zoom into worlds seamlessly.
*   **Forgiving UX:** No "Fatal Errors". If they tap the wrong thing, it just giggles or shakes.

---

## 2. App Flow & Visuals

### 1. The Welcome Screen (The "Playground")
**Visual:** A living, breathing 2D world. Clouds move, birds fly, trees sway.
*   **Background:** Parallax scrolling village scene.
*   **Logo:** "Orukkam" logo floats in the center, bobbing up and down.
*   **The "Start" Button:** A massive, pulsing Green Button with a "Play" icon. No text needed initially.
    *   *Interaction:* When tapped, it squashes flat and springs back with a *Pop* sound.

### 2. The Login (Frictionless)
**Trigger:** Tapping "Start".
**Action:**
1.  **Google One Tap:** Immediately show the Google account picker (bottom sheet).
2.  **Fallback:** If canceled, show a big "Phone" icon button.
**Transition:** Once logged in, the camera *zooms* past the logo into the village (The Map).

### 3. Profile Setup (Gamified)
**Context:** New User Only.
**Voiceover:** "Ninte peru entha?" (What is your name?) directly from the character.
**Inputs:**
1.  **Name:** Big text box.
2.  **Avatar:** 4 Animated Avatars (Tiger, Deer, Robot, Super-Kid). They wave when selected.
3.  **District:** Map of Kerala. They tap their district.
**Finish:** The Avatar jumps into the screen and says "Let's Go!"

### 4. The Home Map (The World)
**Visual:** A vibrant top-down map. The student’s Avatar walks to where they tap.
**The 5 Worlds (Theme Parks):**
1.  **Malayalam Garden:** Giant 3D flowers and bees.
2.  **English Camp:** Tents with campfire smoke particles.
3.  **Maths Factory:** Gears turning, steam pipes puffing.
4.  **EVS Park:** Butterflies flying, a river flowing.
5.  **GK Library:** An ancient building with glowing windows.
**Smoothness Constraint:** Map panning must run at 60fps.

---

## 3. Gameplay Mechanics (The "Juice")

### 1. Entering a Level
*   **Action:** Tap "Maths Factory".
*   **Transition:** The camera zooms *into* the Factory door. The screen fades to the Factory interior (Snake Path). No black screens.

### 2. The Quiz Interface (The Game)
**Layout:**
*   **Question:** Displayed on a "Wooden Sign" or "Digital Screen" depending on the world.
*   **Options:** 4 Floating Bubbles or Gears.
**Interaction:**
*   **Draggable Answers:** Instead of just tapping, let kids *drag* the answer bubble to the question slot? (Keep tapping for speed, but add drag support).
*   **Correct Answer:**
    *   *Visual:* The bubble bursts into confetti/stars. The Avatar does a victory dance.
    *   *Audio:* "Midukkan!" (Smart boy/girl!) or specific praise.
*   **Wrong Answer:**
    *   *Visual:* The bubble shakes and turns grey. The Avatar looks puzzled (not sad).
    *   *Audio:* "Oh, saramilla!" (Oh, no problem!). Then, the "Did You Know?" card slides up gently.

---

## 4. The Teacher/Admin Mode (Discreet Access)

**Problem:** We don't want kids accidentally deleting questions or changing settings.
**Solution:** "Secret Knock" Login.

### 1. How to Access
*   **Location:** Welcome Screen or Settings Icon.
*   **Action:** **Long Press** the "Orukkam" Logo for 3 seconds.
*   **Visual:** A secure "Keypad" slides up.
*   **Auth:** Enter a 4-digit School PIN or sign in with a Teacher Email.

### 2. Teacher Dashboard (The "Control Room")
*   **Visual Style:** Clean, professional, dark mode (distinct from the colorful student view).
*   **Features:**
    1.  **Magic Sheet Import:** Paste a Google Sheet link to bulk-add questions.
    2.  **Smart Paste:** Paste raw text from Word/WhatsApp, AI parses it into questions.
    3.  **Live Monitor:** See how many students are active right now.

---

## 5. Technical Requirements for "Smoothness"

### Android (Jetpack Compose)
1.  **Animation Spec:** Use `Spring` stiffness for natural motion (bouncing buttons).
2.  **Images:** Pre-load the next level's assets while the user is on the map. Use Coil's `memoryCachePolicy`.
3.  **Audio:** SoundPool for UI sounds (clicks, pops) to ensure zero latency. ExoPlayer for background music (soft, looping Lo-Fi beat).
4.  **Database:** Room DB. Everything must work offline.

## 6. LSS Content Plan (Syllabus)
*   **Malayalam:** Padyam, Artham, Paryayam.
*   **English:** Grammar, Comprehension.
*   **Maths:** Mental Maths, Patterns.
*   **EVS:** Nature, Health.
*   **GK:** Current Affairs.

## 7. Next Steps
1.  **Design:** Sketch the "Avatar" and "Map" assets.
2.  **Dev:** Build the "Smooth Map" prototype with zooming transitions.
