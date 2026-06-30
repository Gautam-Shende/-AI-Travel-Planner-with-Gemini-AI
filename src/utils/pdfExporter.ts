import { jsPDF } from 'jspdf';
import type { TravelPlan } from '../services/travelPlanner';

export function exportToPDF(plan: TravelPlan) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  const checkPageBreak = (heightNeeded: number) => {
    if (y + heightNeeded > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
      return true;
    }
    return false;
  };

  const drawHeaderFooter = () => {
    // Header line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);

    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`AI TRAVEL PLANNER  |  ${plan.destination.toUpperCase()}`, margin, 10);

    // Footer page number
    const pageCount = doc.internal.pages.length - 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`Page ${pageCount}`, pageWidth - margin - 10, pageHeight - 8);
    doc.text(`Made with ❤️ using React + Gemini AI`, margin, pageHeight - 8);
  };

  // 1. Cover Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(plan.destination, margin, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(99, 102, 241); // indigo-500
  doc.text(`Personalized ${plan.days}-Day Travel Itinerary`, margin, y);
  y += 8;

  // Metadata block
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`Traveler Type: ${plan.travelType}`, margin + 5, y + 7);
  doc.text(`Budget Limit: INR ${plan.budget.toLocaleString('en-IN')}`, margin + 5, y + 13);
  doc.text(`Duration: ${plan.days} Days`, margin + 80, y + 7);
  if (plan.createdAt) {
    doc.text(`Created: ${plan.createdAt.replace('\n', ' ')}`, margin + 80, y + 13);
  }
  y += 24;

  // 2. Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("🌍 Trip Summary", margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105); // slate-600
  const summaryLines = doc.splitTextToSize(plan.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 5) + 8;

  // 3. Day-by-Day schedule
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("📅 Day-wise Itinerary", margin, y);
  y += 8;

  plan.itinerary.forEach((dayPlan) => {
    checkPageBreak(30);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(99, 102, 241); // indigo
    doc.text(`Day ${dayPlan.day} — ${dayPlan.theme}`, margin, y);
    y += 6;

    dayPlan.activities.forEach((act) => {
      const titleStr = `${act.time}: ${act.title} (${act.location})`;
      const descLines = doc.splitTextToSize(act.description, contentWidth - 10);
      const activityHeight = 8 + (descLines.length * 4.5);

      checkPageBreak(activityHeight);

      // Bullet dot
      doc.setFillColor(16, 185, 129); // emerald
      doc.circle(margin + 2, y - 1, 1, 'F');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(titleStr, margin + 6, y);
      
      // Cost
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(5, 150, 105); // emerald-600
      const costStr = act.cost > 0 ? `INR ${act.cost.toLocaleString('en-IN')}` : 'Free';
      doc.text(costStr, pageWidth - margin - doc.getTextWidth(costStr), y);
      y += 5;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(descLines, margin + 6, y);
      y += (descLines.length * 4.5) + 3;
    });
    y += 4;
  });

  // 4. Budget Breakdown
  checkPageBreak(40);
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("💰 Budget Breakdown", margin, y);
  y += 6;

  // Draw table header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text("Category", margin + 4, y + 5);
  doc.text("Cost (INR)", margin + 70, y + 5);
  doc.text("Percentage", margin + 120, y + 5);
  y += 7;

  // Draw categories
  plan.budgetBreakdown.forEach((item) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(item.category, margin + 4, y + 5);
    doc.text(`INR ${item.amount.toLocaleString('en-IN')}`, margin + 70, y + 5);
    doc.text(`${item.percentage}%`, margin + 120, y + 5);
    
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, y + 7, pageWidth - margin, y + 7);
    y += 7;
  });

  const actualTotal = plan.budgetBreakdown.reduce((sum, item) => sum + item.amount, 0);
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("Total Estimated Cost:", margin + 4, y + 6);
  doc.text(`INR ${actualTotal.toLocaleString('en-IN')}`, margin + 70, y + 6);
  y += 12;

  // 5. Top Places
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("📍 Top Places to Visit", margin, y);
  y += 6;

  plan.topPlaces.forEach((place, i) => {
    const textStr = `${i + 1}. ${place.name}: ${place.description}`;
    const lines = doc.splitTextToSize(textStr, contentWidth);
    checkPageBreak(lines.length * 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(lines, margin, y);
    y += (lines.length * 5) + 2;
  });
  y += 4;

  // 6. Food Recommendations
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("🍜 Local Food Recommendations", margin, y);
  y += 6;

  plan.localFoods.forEach((food) => {
    const textStr = `• ${food.dish}: ${food.description}`;
    const lines = doc.splitTextToSize(textStr, contentWidth);
    checkPageBreak(lines.length * 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(lines, margin, y);
    y += (lines.length * 5) + 2;
  });
  y += 4;

  // 7. Hidden Gems
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("⭐ Hidden Gems (Less Crowded)", margin, y);
  y += 6;

  plan.hiddenGems.forEach((gem) => {
    const textStr = `★ ${gem.name}: ${gem.description}`;
    const lines = doc.splitTextToSize(textStr, contentWidth);
    checkPageBreak(lines.length * 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(lines, margin, y);
    y += (lines.length * 5) + 2;
  });
  y += 4;

  // 8. Safety & Money Saving Tips
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("⚠️ Safety Tips", margin, y);
  y += 6;

  plan.safetyTips.forEach((tip) => {
    const lines = doc.splitTextToSize(`• ${tip}`, contentWidth);
    checkPageBreak(lines.length * 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(lines, margin, y);
    y += (lines.length * 5) + 2;
  });
  y += 4;

  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("💡 Money Saving Tips", margin, y);
  y += 6;

  plan.moneySavingTips.forEach((tip) => {
    const lines = doc.splitTextToSize(`• ${tip}`, contentWidth);
    checkPageBreak(lines.length * 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(lines, margin, y);
    y += (lines.length * 5) + 2;
  });

  // Apply header/footers to all pages retroactively
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawHeaderFooter();
  }

  // Save the PDF
  const filename = `${plan.destination.toLowerCase().replace(/\s+/g, '_')}_itinerary.pdf`;
  doc.save(filename);
}
