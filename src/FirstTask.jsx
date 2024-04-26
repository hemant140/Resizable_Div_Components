import React from 'react'
import ResizableBox from './Resizable'

function FirstTask() {
    return (
        <>
            <div className="main">
                <ResizableBox boxWidth={700} boxHeight={200}>
                    <div>
                        Component 1
                    </div>
                </ResizableBox>
                <ResizableBox boxWidth={700} boxHeight={200}>
                    <div>
                        Component 2
                    </div>

                </ResizableBox>

            </div>
            <div >
                <ResizableBox boxWidth={1360} boxHeight={350}>
                    <div>
                        Component 3
                    </div>
                </ResizableBox>
            </div>
        </>
    )
}

export default FirstTask
