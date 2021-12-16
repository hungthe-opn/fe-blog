import './Loading.css';

const Loading = () => {

    return(
        <div className="backdrop">
            <div className="content">

            <div className="main-dragon">
                <div className="shadow-wrapper">
                    <div className="shadow" />
                </div>
                <div className="dragon">
                    <div className="body" />
                    <div className="horn-left"></div>
                    <div className="horn-right"></div>
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                    <div className="blush left"></div>
                    <div className="blush right"></div>
                    <div className="mouth"></div>
                    <div className="tail-sting"></div>
                </div>
                <div className="fire-wrapper">
                    <div className="fire"></div>
                </div>
                <div className="progresss">
                    <span>Loading...</span>
                    <div className="outer">
                        <div className="inner"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>


    )

}

export default Loading;