import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Header.module.css"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile as queryFn } from 'src/services/user'
import { deleteCookie } from 'src/utils/cookie'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import toast from 'react-hot-toast'

function Header() {
    const queryClient = useQueryClient()

    const [showMenu, setShowMenu] = useState(true)

    const queryKey = ["profile"]

    const { data } = useQuery({
        queryKey,
        queryFn
    })

    const navigate = useNavigate()

    useEffect(() => {
        setShowMenu(false)
    }, [window.location.href])


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
                            <div className={styles.menu} id='menu'>
                                {data?.data.role === "ADMIN" && (
                                    <div>
                                        <Link to="/admin">
                                            <img src="setting.svg" alt="" width="20px" />
                                            <p>پنل ادمین</p>
                                        </Link>
                                    </div>
                                )}
                                <div>
                                    <Link to="dashboard">
                                        {/* <img src="profile.svg" alt="" /> */}
                                        <PersonIcon style={{ color: "#969696", marginLeft: "5px" }} />
                                        <p>پروفایل</p>
                                    </Link>
                                </div>
                                <div className={styles.logoutButton} onClick={logoutHandler}>

                                    <LogoutIcon style={{ color: "grey", marginLeft: "5px" }} />
                                    <p>خروج</p>
                                </div>

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