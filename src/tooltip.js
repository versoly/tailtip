import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

// todo options.middleware.offset options.middleware.shift.padding
export const Tailtip = function (elem, options = {}) {
  const tooltip = elem.nextElementSibling;
  const arrowElement = tooltip.querySelector('.tooltip-arrow');

  const middleware = [
    offset(6),
    flip(),
    shift({
      padding: 5,
    }),
  ];

  if (arrowElement) {
    middleware.push(
      arrow({
        element: arrowElement,
      })
    );
  }

  function update() {
    computePosition(elem, tooltip, {
      placement: options.placement || 'top',
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      }
    });
  }

  const resetTooltipPosition = () => {
    tooltip.style.display = 'block';
    update();
    requestAnimationFrame(() => {
      tooltip.style.display = '';
    });
  };

  resetTooltipPosition();

  const showTooltip = () => {
    tooltip.style.display = 'block';
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    });
    update();
  };

  const hideTooltip = () => {
    tooltip.style.display = '';
    tooltip.style.opacity = '';
    tooltip.style.visibility = '';
  };

  const toggleTooltip = () => {
    if (tooltip.style.display === 'block') {
      hideTooltip();
      return;
    }

    showTooltip();
  };

  let showTooltipEvents = ['mouseenter', 'focus'];
  let hideTooltipEvents = ['mouseleave', 'blur'];
  let toggleTooltipEvents = [];

  if (options.trigger === 'click') {
    showTooltipEvents = [];
    hideTooltipEvents = ['blur'];
    toggleTooltipEvents = ['click'];
  }

  if (toggleTooltipEvents.includes('click')) {
    const clickOutside = (e) => {
      if (!tooltip.contains(e.target) && !elem.contains(e.target)) {
        hideTooltip();
        document.removeEventListener('click', clickOutside);
      }
    };

    elem.addEventListener('click', () => {
      document.addEventListener('click', clickOutside);
    });
  }

  showTooltipEvents.forEach((event) => {
    elem.addEventListener(event, showTooltip);
  });
  hideTooltipEvents.forEach((event) => {
    elem.addEventListener(event, hideTooltip);
  });
  toggleTooltipEvents.forEach((event) => {
    elem.addEventListener(event, toggleTooltip);
  });
};
