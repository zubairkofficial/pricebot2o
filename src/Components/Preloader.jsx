import React from 'react'

export default function Preloader() {
    return (
        <section>
            <div id="preloader">
                <div id="ctn-preloader" className="ctn-preloader">
                    <div className="animation-preloader">
                        <div className="spinner"></div>
                        <div className="txt-loading">
                            <span data-text-preloader="D" className="letters-loading">
                                D
                            </span>
                            <span data-text-preloader="E" className="letters-loading">
                                E
                            </span>
                            <span data-text-preloader="S" className="letters-loading">
                                S
                            </span>
                            <span data-text-preloader="K" className="letters-loading">
                                K
                            </span>
                            <span data-text-preloader="I" className="letters-loading">
                                I
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
