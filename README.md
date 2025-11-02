# MA-Hate-Speech  
**Dashboard for a Hate Speech Classifier with Explainable AI**

## Overview  
This project provides a web-based dashboard to a hate-speech classification system.  
It includes views for (1) Instance Overview, (2) Instance Classification, (3) Dataset and Category Information, and (4) Model Performance.

Live Deployment: [https://ma-hate-speech.vercel.app/](https://ma-hate-speech.vercel.app/)  
Hosted on **Vercel**

---

## Structure & Key Pages

### `app/page.tsx`
- Serves as the **main landing page** for the deployment.
- Provides the base layout, top-level navigation, and links to key sections:
  - **Instance Overview**
  - **Model Overview**
  - **Training Data & Categories Overview**

### Section Pages
Each section has its own page file, typically located under `app/<section>/page.tsx`, for example:
- `app/instance/page.tsx` – Displays a list or details of classification instances.
- `app/model/page.tsx` – Shows model metrics, visualizations, and diagnostic charts.
- `app/data/page.tsx` – Explains training data categories, definitions, and FAQ-style information.

### `components/` Directory
Contains pages used across the app, including:
- **(1) Instance Overview** – in `overview-view.tsx`
- **(2) Instance Classification** – all instances (in `instance 2.tsx` to `instance 7.tsx`) inherit from `InstanceParent.tsx`. `instance-1.tsx` contains everything for quick checks.
- **(3) Dataset and Category Information** – in `training-data-overview.tsx`
- **(4) Model Performance** – in `modell-view.tsx`


### `lib/` Directory
Houses utility functions and API logic such as:
- Data fetching for instances and model metrics.
- Shared helper functions for formatting or computation.

### `styles/` Directory
Contains global styles and Tailwind or CSS module definitions for consistent UI styling.

---

## Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/noracre/MA-Hate-Speech.git
   cd MA-Hate-Speech

2. **Install dependencies**
    download node.js from nodejs.org
    Open console (cmd)
    `cd` to project directory
    `npm install` to console
    Change next.config. Overwrite everything with:
        /** @type {import('next').NextConfig} */
        const nextConfig = {
        output: 'export',
        trailingSlash: true,
        images: {
            unoptimized: true
        }
        }
    export default nextConfig

3. **Start the development server**
    `cd` to project directory
    in console run `npm run dev`

4. **Open the app** 
    Visit http://localhost:3000 in browser
