import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/Header";
import type { WorkoutPlan } from "@/services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function FinalTraining() {
  const location = useLocation();
  const navigate = useNavigate();
  const workoutPlan: WorkoutPlan | null = location.state?.workoutPlan || null;

  // Redirect to quiz if no plan data
  useEffect(() => {
    if (!workoutPlan) {
      navigate('/');
    }
  }, [workoutPlan, navigate]);

  if (!workoutPlan) return null;

  const handleDownloadPDF = async () => {
    // Create offscreen mobile-width container
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "375px";
    tempContainer.style.backgroundColor = "#0b1528"; // Dark theme
    tempContainer.style.color = "#ffffff";
    tempContainer.style.display = "flex";
    tempContainer.style.flexDirection = "column";
    tempContainer.style.gap = "20px";
    tempContainer.style.padding = "20px";
    tempContainer.style.fontFamily = "system-ui, -apple-system, sans-serif";

    // Build mobile-optimized layout HTML using safe hex colors (bypassing Tailwind v4 oklch variables)
    tempContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 10px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <span style="font-weight: bold; font-size: 11px; letter-spacing: 0.1em; color: #94a3b8;">[W] PROTOCOL-W</span>
        <h1 style="font-size: 22px; font-weight: 800; margin: 0; color: #ffffff; line-height: 1.2;">${workoutPlan.title}</h1>
        <p style="font-size: 13px; color: #94a3b8; margin: 0; max-width: 320px; line-height: 1.4;">${workoutPlan.description}</p>
        <div style="display: flex; gap: 6px; justify-content: center; margin-top: 4px;">
          <span style="padding: 3px 8px; border-radius: 9999px; font-size: 9px; font-weight: 700; background-color: #e11d48; color: #ffffff;">${workoutPlan.frequency}</span>
          <span style="padding: 3px 8px; border-radius: 9999px; font-size: 9px; font-weight: 700; background-color: #1e293b; color: #f8fafc;">${workoutPlan.duration}</span>
          <span style="padding: 3px 8px; border-radius: 9999px; font-size: 9px; font-weight: 700; background-color: #f59e0b; color: #ffffff;">${workoutPlan.level}</span>
        </div>
      </div>
    `;

    // Clone day cards
    workoutPlan.days.forEach(day => {
      const dayCard = document.createElement("div");
      dayCard.style.backgroundColor = "#ffffff";
      dayCard.style.color = "#000000";
      dayCard.style.borderRadius = "16px";
      dayCard.style.padding = "18px";
      dayCard.style.border = "1px solid #e2e8f0";
      dayCard.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
      dayCard.style.display = "flex";
      dayCard.style.flexDirection = "column";
      dayCard.style.gap = "12px";

      dayCard.innerHTML = `
        <div style="text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 4px;">
          <h2 style="font-weight: 800; font-size: 17px; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">${day.day}</h2>
          <p style="font-size: 11px; color: #64748b; font-weight: 700; margin: 4px 0 0 0; text-transform: uppercase;">${day.focus}</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${day.exercises.map(ex => `
            <div style="padding-bottom: 8px; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 13.5px; font-weight: 700; color: #0f172a;">${ex.name}</span>
              <div style="display: flex; gap: 6px; font-size: 11px; color: #64748b; font-weight: 600;">
                <span>${ex.sets} × ${ex.reps}</span>
                <span>|</span>
                <span>Rest: ${ex.rest}</span>
              </div>
              ${ex.notes ? `<span style="font-size: 10px; color: #94a3b8; font-style: italic; margin-top: 2px;">* ${ex.notes}</span>` : ""}
            </div>
          `).join("")}
        </div>
      `;
      tempContainer.appendChild(dayCard);
    });

    // Append tips
    if (workoutPlan.tips && workoutPlan.tips.length > 0) {
      const tipsCard = document.createElement("div");
      tipsCard.style.backgroundColor = "#ffffff";
      tipsCard.style.color = "#000000";
      tipsCard.style.borderRadius = "16px";
      tipsCard.style.padding = "18px";
      tipsCard.style.border = "1px solid #e2e8f0";
      tipsCard.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)";

      tipsCard.innerHTML = `
        <h3 style="font-weight: 800; font-size: 13px; text-align: center; margin: 0 0 10px 0; color: #0f172a; letter-spacing: 0.05em;">💡 PRO TIPS</h3>
        <ul style="padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${workoutPlan.tips.map(tip => `
            <li style="font-size: 11.5px; color: #334155; display: flex; gap: 8px; line-height: 1.4;">
              <span style="color: #e11d48; font-weight: 900;">•</span>
              <span>${tip}</span>
            </li>
          `).join("")}
        </ul>
      `;
      tempContainer.appendChild(tipsCard);
    }

    document.body.appendChild(tempContainer);

    try {
      // Temporarily intercept getComputedStyle to bypass html2canvas oklch parsing bug
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = function (el, pseudoElt) {
        const style = originalGetComputedStyle(el, pseudoElt);
        return new Proxy(style, {
          get(target, prop) {
            const val = Reflect.get(target, prop);
            if (typeof val === "function") {
              return val.bind(target);
            }
            if (typeof val === "string" && val.includes("oklch")) {
              // Convert tailwind v4 oklch variables to safe fallback rgb colors
              if (prop === "backgroundColor") return "rgb(11, 21, 40)";
              if (prop === "color") return "rgb(255, 255, 255)";
              if (prop === "borderColor") return "rgb(30, 41, 59)";
              return "rgb(255, 255, 255)";
            }
            return val;
          }
        });
      };

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0b1528"
      });

      // Restore original getComputedStyle immediately after rendering
      window.getComputedStyle = originalGetComputedStyle;

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210; // A4 Width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const filename = `${workoutPlan.title.toLowerCase().replace(/\s+/g, "-")}-protocol.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen overflow-y-auto scrollbar-hide bg-[var(--background)]"
    >
      {/* Header Area */}
      <Header />
      
      {/* Hero Section */}
      <section className="px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="flex flex-col gap-2 items-center">
          <span className="font-bold text-sm text-muted-foreground">[W] Protocol-W</span>
          <h1 className="text-3xl font-bold tracking-tight">{workoutPlan.title}</h1>
          <p className="text-sm text-muted-foreground max-w-md">{workoutPlan.description}</p>
        </div>
        
        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)]">
            {workoutPlan.frequency}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            {workoutPlan.duration}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)] text-[var(--accent-foreground)]">
            {workoutPlan.level}
          </span>
        </div>

        <div className="flex gap-3 w-full max-w-xs mt-2">
          <Button variant="outline" className="flex-1" onClick={handleDownloadPDF}>Save Asset</Button>
          <Button variant="default" className="flex-1" onClick={handleDownloadPDF}>Download</Button>
        </div>
      </section>

      {/* Training Plan Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 pb-6 gap-6">
        
        {/* ABC Day Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workoutPlan.days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.15, duration: 0.4 }}
            >
              <Card className="flex flex-col p-5 shadow-md bg-white text-black min-h-[300px] border border-gray-200 h-full">
                {/* Day Header */}
                <div className="text-center border-b border-gray-300 pb-3 mb-4">
                  <h2 className="font-bold text-lg">{day.day}</h2>
                  <p className="text-xs text-gray-500 font-semibold mt-1">{day.focus}</p>
                </div>
                
                {/* Exercises */}
                <div className="flex flex-col gap-3 flex-1">
                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex flex-col gap-0.5 pb-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-sm">{exercise.name}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{exercise.sets} × {exercise.reps}</span>
                        <span className="text-gray-300">|</span>
                        <span>Rest: {exercise.rest}</span>
                      </div>
                      {exercise.notes && (
                        <span className="text-xs text-gray-400 italic mt-0.5">{exercise.notes}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        {workoutPlan.tips && workoutPlan.tips.length > 0 && (
          <Card className="p-5 shadow-md bg-white text-black border border-gray-200">
            <h3 className="font-bold text-sm mb-3 text-center">💡 PRO TIPS</h3>
            <ul className="flex flex-col gap-2">
              {workoutPlan.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-[var(--primary)] font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </main>

      {/* Footer Action */}
      <footer className="px-6 py-6 border-t border-[var(--border)] flex flex-col gap-4 bg-[var(--background)] mt-auto sticky bottom-0">
        <Button size="lg" className="w-full" onClick={handleDownloadPDF}>Download Protocol</Button>
        <p className="text-xs text-center text-muted-foreground">
          * Future Roadmap: Edit Training Parameters | Track Workout Progress
        </p>
      </footer>
    </motion.div>
  );
}
