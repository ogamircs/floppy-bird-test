/**
 * Utility functions for the game
 */
/**
 * Checks if two bounding boxes intersect (AABB collision detection)
 */
export function checkCollision(a, b) {
    return (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y);
}
/**
 * Draws the ground
 */
export function drawGround(ctx, canvasWidth, canvasHeight, groundHeight) {
    const groundY = canvasHeight - groundHeight;
    // Draw ground body
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, groundY, canvasWidth, groundHeight);
    // Draw grass on top
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, groundY, canvasWidth, 10);
    // Draw ground texture lines
    ctx.strokeStyle = '#bc8a5f';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvasWidth; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, groundY + 15);
        ctx.lineTo(i + 15, groundY + 25);
        ctx.stroke();
    }
}
/**
 * Draws the background (sky with clouds)
 */
export function drawBackground(ctx, canvasWidth, canvasHeight) {
    // Draw gradient sky
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Draw some clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    drawCloud(ctx, 50, 80, 40);
    drawCloud(ctx, 200, 120, 50);
    drawCloud(ctx, 320, 60, 35);
    drawCloud(ctx, 150, 200, 30);
}
/**
 * Draws a cloud shape
 */
function drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y, size * 0.6, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.3, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
}
/**
 * Draws text with a shadow/outline effect
 */
export function drawText(ctx, text, x, y, fontSize = 30, color = '#fff', align = 'center') {
    ctx.font = `bold ${fontSize}px 'Segoe UI', Arial, sans-serif`;
    ctx.textAlign = align;
    // Draw shadow/outline
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeText(text, x, y);
    // Draw text
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}
//# sourceMappingURL=utils.js.map