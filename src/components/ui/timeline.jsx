import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const entryRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const container = ref.current;
    if (!container || dotRefs.current.length === 0) return;

    const measure = () => {
      const parentRect = container.getBoundingClientRect();
      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[dotRefs.current.length - 1];
      if (!firstDot || !lastDot) return;

      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      const top = firstRect.top + firstRect.height / 2 - parentRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - parentRect.top;

      setLineStyle({ top, height: bottom - top });
    };

    measure();
    window.addEventListener("resize", measure);

    // Re-measure whenever the container size changes (e.g. language switch)
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [data]);

  useEffect(() => {
    const observers = [];
    entryRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, index));
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [data]);

  return (
    <div className="act-timeline">
      <div ref={ref} className="act-timeline-inner">
        {/* Line from first dot to last dot */}
        <div
          style={{ top: lineStyle.top + "px", height: lineStyle.height + "px" }}
          className="act-line-container"
        />
        {data.map((item, index) => (
          <div
            key={index}
            className="act-timeline-entry"
            ref={(el) => (entryRefs.current[index] = el)}
          >
            {/* Left column: dot + title (desktop) */}
            <div className="act-left-col">
              <div
                className="act-dot-outer"
                ref={(el) => (dotRefs.current[index] = el)}
              >
                <div
                  className={
                    "act-dot-inner" +
                    (index <= activeIndex ? " act-dot-active" : "")
                  }
                />
              </div>
              <h3
                className={
                  "act-entry-title act-title-desktop" +
                  (index <= activeIndex ? " act-title-active" : "")
                }
              >
                {item.title}
              </h3>
            </div>

            {/* Right column: mobile title + content */}
            <div className="act-right-col">
              <h3
                className={
                  "act-entry-title act-title-mobile" +
                  (index <= activeIndex ? " act-title-active" : "")
                }
              >
                {item.title}
              </h3>
              <div className="act-content">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
