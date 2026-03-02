# 🧠 Mindathon Academy Website

A stunning, modern website for Mindathon Academy - featuring 3D effects, particle animations, and a beautiful blue game theme.

![Mindathon Academy](https://img.shields.io/badge/Mindathon-Academy-00d4ff?style=for-the-badge&logo=brain&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- **3D Animated Hero Section** - Floating brain visualization with neural nodes
- **Particle System** - Interactive canvas-based particle background
- **Glassmorphism Design** - Modern frosted glass UI elements
- **Smooth Scroll Animations** - Reveal elements as you scroll
- **Countdown Timer** - Live countdown to the event
- **Tilt Effects** - 3D perspective tilt on hover
- **Custom Cursor** - Glowing cursor effect
- **Fully Responsive** - Works on all devices
- **Preloader** - Smooth loading animation

## 🚀 Deployment to GitHub Pages

### Option 1: Quick Deploy

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Mindathon Academy website"
   git push origin main
   ```

2. Go to your repository on GitHub

3. Navigate to **Settings** → **Pages**

4. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`

5. Click **Save**

6. Your site will be live at: `https://yourusername.github.io/mindathon_website/`

### Option 2: Using GitHub CLI

```bash
# If you have GitHub CLI installed
gh repo create mindathon-academy --public --source=. --remote=origin --push
gh repo view --web
# Then enable GitHub Pages from the Settings
```

## 📁 Project Structure

```
mindathon_website/
├── index.html          # Main HTML file
├── styles.css          # All styling & animations
├── script.js           # JavaScript interactions
└── README.md           # This file
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark | `#0a0e27` | Background |
| Primary | `#0f1642` | Sections |
| Accent Cyan | `#00d4ff` | Highlights |
| Accent Teal | `#00f5d4` | Gradients |
| Accent Purple | `#7b68ee` | Accents |

## 📞 Event Details

- **Date**: March 15, 2026
- **Time**: 4:00 PM - 6:30 PM
- **Venue**: YMCA Seminar Hall (Hibiscus Room)
- **Address**: 95, Jalan Padang Belia, Brickfields, Kuala Lumpur
- **Contact**: 012-469 1671 / 017-766 4345

## 🛠️ Customization

### Change Event Date
Edit `script.js` line ~360:
```javascript
new CountdownTimer('March 15, 2026 16:00:00');
```

### Change Colors
Edit `styles.css` root variables:
```css
:root {
    --accent-blue: #00d4ff;
    --accent-cyan: #00f5d4;
    --accent-purple: #7b68ee;
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2026 Mindathon Academy. All Rights Reserved.

---

Made with 💙 for Mindathon Academy
