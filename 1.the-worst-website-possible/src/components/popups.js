import Loading from "./loading.gif";

export default function Popups() {
    setTimeout(() => {
        document.getElementById("cookie-body").style.display = "flex";
        document.getElementById("loading-spinner-1").style.display = "none";
    }, 1000);

    let isRed = true;
    const annoyingFunction = () => {
        if (isRed) {
            document.getElementById("confirmation-body").style.backgroundColor = "#ff5555";
            isRed = false;
        } else {
            document.getElementById("confirmation-body").style.backgroundColor = "#ff0000";
            isRed = true;
        }
    };
    let annoyingInterval;
    return (
        <>
            <div id="popup1-root" className="absolute top-0 w-full h-full bg-[#000000aa] flex justify-center">
                <img id="loading-spinner-1" src={Loading} className="w-[400px] h-[200px]" alt="" />
                <div id="cookie-body" className="hidden w-[400px] h-[200px] bg-[#ffffff] text-center flex-col justify-center items-center gap-[40px]">
                    <p className="text-2xl">this site uses cookies.</p>
                    <button className="text-lg" onClick={() => {
                        document.cookie = "mwahahahahahaha=you fool";
                        document.getElementById("cookie-body").style.display = "none";
                        document.getElementById("loading-spinner-1").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("popup1-root").style.display = "none";
                        }, 1000);

                        setTimeout(() => {
                            document.getElementById("popup2-root").style.display = "flex";
                            setTimeout(() => {
                                document.getElementById("loading-spinner-2").style.display = "none";
                                document.getElementById("email-body").style.display = "flex";
                            }, 1000);
                        }, 10000)
                    }}>accept cookies</button>
                </div>
            </div>
            <div id="popup2-root" className="hidden absolute top-0 w-full h-full bg-[#000000aa] justify-center">
                <img id="loading-spinner-2" src={Loading} className="w-[400px] h-[200px]" alt="" />
                <div id="email-body" className="hidden w-[400px] h-[200px] bg-[#ccc] text-center flex-col items-center justify-center gap-[40px]">
                    <p className="text-2xl">sign up to our mailing list for <b>bi-hourly</b> out of this world facts!</p>
                    <input type="text" placeholder="email" className="w-[200px]" />
                    <button className="underline" onClick={() => {
                        document.getElementById("popup3-root").style.display = "flex";
                        setTimeout(() => {
                            document.getElementById("loading-spinner-3").style.display = "none";
                            document.getElementById("confirmation-body").style.display = "flex";
                            annoyingInterval = setInterval(annoyingFunction, 200);
                        }, 500);
                    }}>no, go away</button>
                </div>
            </div>
            <div id="popup3-root" className="hidden absolute z-10 w-full top-[150px] justify-center">
                    <img id="loading-spinner-3" src={Loading} className="w-[250px] h-[100px]" />
                    <div id="confirmation-body" className="hidden w-[500px] h-[300px] bg-[#ff5555] text-center flex-col items-center justify-center gap-[20px]">
                        <p className="text-6xl text-[#fff]">are you sure‽‽</p>
                        <button className="text-2xl" onClick={() => {
                            document.getElementById("confirmation-body").style.display = "none";
                            document.getElementById("loading-spinner-3").style.display = "block";
                            setTimeout(() => {
                                document.getElementById("popup3-root").style.display = "none";
                                document.getElementById("popup2-root").style.display = "none";
                                clearInterval(annoyingInterval);
                            }, 1000);
                        }}>yes.</button>
                        <a className="text-7xl" href="https://www.youtube.com/watch?v=1xcqXBGv5DM">no.</a>
                    </div>
            </div>
        </>
    )
}
