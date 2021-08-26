import React from 'react'

function Avatars() {
    var profileURLs = [
        "https://i.imgur.com/op4VpH7.png",
        "https://i.imgur.com/PAHRVpM.png",
        "https://i.imgur.com/779J2JC.png",
        "https://i.imgur.com/o9axORP.png",
        "https://i.imgur.com/URXtNOi.png",
        "https://i.imgur.com/jmnVMBf.png",
        "https://i.imgur.com/3uXKLBx.png",
        "https://i.imgur.com/HGzbvK0.png",
        "https://i.imgur.com/zxMLcE0.png",
        "https://i.imgur.com/o9UUr2r.png",
        "https://i.imgur.com/vxDbnGW.png",
        "https://i.imgur.com/akiw69K.png",
        "https://i.imgur.com/g8c8X03.png",
        "https://i.imgur.com/xpz9C3V.png",
        "https://i.imgur.com/8OULeB0.png",
        "https://i.imgur.com/wOEgc4a.png",
        "https://i.imgur.com/Zei1eW3.png",
        "https://i.imgur.com/f3BDx1h.png",
        "https://i.imgur.com/kV8aprk.png",
        "https://i.imgur.com/VSJenR4.png"
    ]
    return (
        <div className={`${showAvatars ? "avatar-display-show" : "avatar-display-hide"}`}>
                <div className="avatar-row">
                    <img src={profileURLs[0]} alt="" className="avatar-option" 
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow(true)
                        }}
                    />
                    <img src={profileURLs[1]} alt="" className="avatar-option" />
                    <img src={profileURLs[2]} alt="" className="avatar-option" />
                    <img src={profileURLs[3]} alt="" className="avatar-option" />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[4]} alt="" className="avatar-option" />
                    <img src={profileURLs[5]} alt="" className="avatar-option" />
                    <img src={profileURLs[6]} alt="" className="avatar-option" />
                    <img src={profileURLs[7]} alt="" className="avatar-option" />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[8]} alt="" className="avatar-option" />
                    <img src={profileURLs[9]} alt="" className="avatar-option" />
                    <img src={profileURLs[10]} alt="" className="avatar-option" />
                    <img src={profileURLs[11]} alt="" className="avatar-option" />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[12]} alt="" className="avatar-option" />
                    <img src={profileURLs[13]} alt="" className="avatar-option" />
                    <img src={profileURLs[14]} alt="" className="avatar-option" />
                    <img src={profileURLs[15]} alt="" className="avatar-option" />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[16]} alt="" className="avatar-option" />
                    <img src={profileURLs[17]} alt="" className="avatar-option" />
                    <img src={profileURLs[18]} alt="" className="avatar-option" />
                    <img src={profileURLs[19]} alt="" className="avatar-option" />
                </div>
            </div>
    )
}

export default Avatars
