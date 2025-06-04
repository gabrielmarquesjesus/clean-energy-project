"use client";

export const LogoutButton = () => {
    const handleLogout = () => {
        fetch("/api/admin/logout", {
            method: "POST",
        }).then(() => {
            window.location.href = "/admin/login";
        })
    };
    return (
        <button
            onClick={() => handleLogout()}
            className="btn transition-all duration-200 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md absolute right-0 top-0 m-2"
        >
            Sair
        </button>
    )
};