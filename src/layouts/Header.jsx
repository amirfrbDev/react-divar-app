import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Header.module.css"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile } from '@/services/user'
import { deleteCookie } from '@/utils/cookie'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import toast from 'react-hot-toast'

function Header() {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const menuRef = useRef()

    const [showMenu, setShowMenu] = useState(true)

    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile
    })


    useEffect(() => {
        setShowMenu(false)
    }, [window.location.href]);

    useEffect(() => {
        const outsideClickHandler = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", outsideClickHandler)

        return () => {
            document.removeEventListener("mousedown", outsideClickHandler)
        }

    }, [])


    const menuHandler = () => {
        if (data) {
            setShowMenu(showMenu => !showMenu)
        } else {
            navigate("/auth");
            setShowMenu(false)
        }
    }

    const logoutHandler = () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        navigate("/")
        queryClient.invalidateQueries({ queryKey: ["profile"] })
        toast.success("از حساب خود خارج شدید!")
        setShowMenu(false)
    }



    return (
        <header className={styles.header}>
            <div>
                <Link to="/">
                    <img src="divar.svg" alt="دیوار" className={styles.logo} />
                </Link>
                <span>
                    {/* <img src="location.svg" alt="شهر" /> */}
                    <FmdGoodOutlinedIcon />
                    <p>تهران</p>
                </span>
            </div>
            <div>
                <div className={styles.dashboardLink}>
                    <span onClick={menuHandler}>
                        <img src="profile.svg" alt="پروفایل" />
                        <p>دیوار من</p>
                    </span>
                    {
                        showMenu && (
                            <div className={styles.menu} id='menu' ref={menuRef}>
                                {data?.data.role === "ADMIN" && (
                                    <Link to="/admin">
                                        <div>
                                            <img src="setting.svg" alt="" width="20px" />
                                            <p>پنل ادمین</p>
                                        </div>
                                    </Link>
                                )}
                                <Link to="dashboard">
                                    <div>
                                        {/* <img src="profile.svg" alt="" /> */}
                                        <PersonIcon style={{ color: "#969696", marginLeft: "5px" }} />
                                        <p>پروفایل</p>
                                    </div>
                                </Link>
                                <Link className={styles.logoutButton} onClick={logoutHandler}>

                                    <div>
                                        <LogoutIcon style={{ color: "grey", marginLeft: "5px" }} />
                                        <p>خروج</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    }
                </div>

                <Link to="/dashboard" className={styles.button}>
                    ثبت آگهی
                </Link>
            </div>
        </header >
    )
}

export default Header