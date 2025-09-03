// tooltip.js
import { select } from 'd3-selection'
import 'd3-transition' // augments selections with .transition()

const tooltipEl = select('.tooltip')
const TOOLTIP_WIDTH = 215
const PADDING = 10

// robust coordinates (mouse, pointer, or touch)
function getPoint(evt) {
  // touch events (mobile)
  const t = evt?.touches?.[0] || evt?.changedTouches?.[0]
  const e = t || evt
  // fall back to clientX/Y if pageX/Y are missing
  const pageX = e?.pageX ?? (e?.clientX != null ? e.clientX + window.scrollX : 0)
  const pageY = e?.pageY ?? (e?.clientY != null ? e.clientY + window.scrollY : 0)
  return { x: pageX, y: pageY }
}

const api = {
  show(content, evt) {
    let { x, y } = getPoint(evt)

    // keep tooltip inside the viewport’s right edge
    const maxLeft = document.body.clientWidth - TOOLTIP_WIDTH - PADDING
    if (x + PADDING > maxLeft) x = maxLeft

    // fade in
    tooltipEl
      .transition()
      .duration(200)
      .style('opacity', 0.9)
      .on('end', () => {
        tooltipEl.classed('isActive', true)
        tooltipEl.on('click', api.hide) // don't use `this.hide` here
      })

    tooltipEl
      .html(content)
      .style('visibility', 'visible')
      .style('left', x + 'px')
      .style('top', y + 'px')
  },

  hide() {
    tooltipEl
      .transition()
      .duration(500)
      .style('opacity', 0)
      .on('end', () => {
        tooltipEl.classed('isActive', false).style('visibility', 'hidden')
      })
  },

  formatContent(component) {
    let content = '<ul class="tooltip-list">'
    component.forEach((item) => {
      const cssClass = item.class || ''
      const label = Object.keys(item)[0]
      content += `<li class="${cssClass}"><span class="tooltip-label">${label}:</span> ${item[label]}</li>`
    })
    content += '</ul>'
    return content
  }
}

export default api
