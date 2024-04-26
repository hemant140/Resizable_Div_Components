import React, { useState, useRef, useEffect } from 'react';

const ResizableBox = ({ children, boxWidth, boxHeight }) => {
    const [width, setWidth] = useState(boxWidth);
    const [height, setHeight] = useState(boxHeight);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState('');
    const [initialRect, setInitialRect] = useState({});
    const boxRef = useRef(null);
    const startX = useRef(0);
    const startY = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = e.pageX - startX.current;
            const deltaY = e.pageY - startY.current;

            let newWidth = initialRect.width;
            let newHeight = initialRect.height;
            let newTop = initialRect.top;
            let newLeft = initialRect.left;

            if (resizeDirection.includes('right')) {
                newWidth = initialRect.width + deltaX;
            } else if (resizeDirection.includes('left')) {
                newWidth = initialRect.width - deltaX;
                newLeft = initialRect.left + deltaX;
            }

            if (resizeDirection.includes('bottom')) {
                newHeight = initialRect.height + deltaY;
            } else if (resizeDirection.includes('top')) {
                newHeight = initialRect.height - deltaY;
                newTop = initialRect.top + deltaY;
            }

            setWidth(newWidth);
            setHeight(newHeight);
            setTop(newTop);
            setLeft(newLeft);

            startX.current = e.pageX;
            startY.current = e.pageY;
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, resizeDirection, initialRect, width, height]);

    const handleMouseDown = (e, direction) => {
        e.preventDefault();
        setIsResizing(true);
        setResizeDirection(direction);
        startX.current = e.pageX;
        startY.current = e.pageY;
        const rect = boxRef.current.getBoundingClientRect();
        setInitialRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });
    };


    return (
        <div
            ref={boxRef}
            className="box"
            style={{ width: `${width}px`, height: `${height}px` }}
        >

            <div className='content'>
                {children}
            </div>
            <div
                className="handle left"
                onMouseDown={(e) => handleMouseDown(e, 'left')}
            />
            <div
                className="handle right"
                onMouseDown={(e) => handleMouseDown(e, 'right')}
            />
            <div
                className="handle top"
                onMouseDown={(e) => handleMouseDown(e, 'top')}
            />
            <div
                className="handle bottom"
                onMouseDown={(e) => handleMouseDown(e, 'bottom')}
            />
            <div
                className="handle corner"
                onMouseDown={(e) => handleMouseDown(e, 'corner')}
            />


        </div>
    );
};

export default ResizableBox;
