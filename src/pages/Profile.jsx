import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaSignOutAlt, FaEdit,
  FaSave, FaTimes, FaHeart, FaFilm, FaTv, FaShieldAlt,
  FaCheckCircle, FaCamera,
} from "react-icons/fa";
import { MdOutlineHd } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── Avatar colours cycling ─────────────────────────────────────
const AVATAR_GRADIENTS = [
  "from-[#02E7F5] to-[#037AEB]",
  "from-purple-500 to-pink-500",
  "from-orange-400 to-red-500",
  "from-green-400 to-teal-500",
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser]           = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData]   = useState({ fullName: "", email: "", mobile: "" });
  const [saved, setSaved]         = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("info"); // info | favorites | security
  const [avatarIdx, setAvatarIdx] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("dToken");
    if (!token) { navigate("/login"); return; }

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const savedAvatar = parseInt(localStorage.getItem("avatarIdx") || "0");
    setUser(userData);
    setAvatarIdx(savedAvatar);
    setEditData({
      fullName: userData.fullName || "",
      email:    userData.email    || "",
      mobile:   userData.mobile   || "",
    });

    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, [navigate]);

  const handleSave = () => {
    const updated = { ...user, ...editData };
    localStorage.setItem("userData", JSON.stringify(updated));
    setUser(updated);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("dToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const removeFav = (title) => {
    const updated = favorites.filter(f => f.title !== title);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const cycleAvatar = () => {
    const next = (avatarIdx + 1) % AVATAR_GRADIENTS.length;
    setAvatarIdx(next);
    localStorage.setItem("avatarIdx", String(next));
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const movieFavs  = favorites.filter(f => f.cat === "movies");
  const seriesFavs = favorites.filter(f => f.cat === "series");

  const tabs = [
    { key: "info",     label: "Account Info",  icon: FaUser },
    { key: "favorites",label: "My Favorites",  icon: FaHeart, badge: favorites.length },
    { key: "security", label: "Security",      icon: FaShieldAlt },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f1014] text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-[5%] md:px-[10%]">
        <div className="max-w-5xl mx-auto">

          {/* ── Hero Card ── */}
          <div className="relative overflow-hidden rounded-3xl mb-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#02E7F5]/10 via-purple-500/5 to-pink-500/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#02E7F5]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0 group cursor-pointer" onClick={cycleAvatar}>
                <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[avatarIdx]} flex items-center justify-center text-4xl md:text-5xl font-black text-white shadow-2xl ring-4 ring-white/10 group-hover:ring-[#02E7F5]/50 transition-all duration-300`}>
                  {initials}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaCamera className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#02E7F5] border-2 border-[#0f1014] flex items-center justify-center">
                  <FaEdit className="text-black text-xs" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {user.fullName || "Disney+ User"}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#02E7F5]/10 border border-[#02E7F5]/30 rounded-full text-[#02E7F5] text-xs font-bold self-center">
                    <FaCheckCircle /> Member
                  </span>
                </div>
                <p className="text-gray-400 mb-5">{user.email}</p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {[
                    { icon: FaHeart,  label: "Favorites",     value: favorites.length,  color: "text-pink-400" },
                    { icon: FaFilm,   label: "Movies Saved",  value: movieFavs.length,  color: "text-[#02E7F5]" },
                    { icon: FaTv,     label: "Series Saved",  value: seriesFavs.length, color: "text-purple-400" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[90px]">
                      <Icon className={`${color} text-lg mx-auto mb-1`} />
                      <p className="text-white font-bold text-xl">{value}</p>
                      <p className="text-gray-400 text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 text-sm font-semibold self-start"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-2 mb-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-1.5">
            {tabs.map(({ key, label, icon: Icon, badge }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-[#02E7F5] to-[#037AEB] text-black shadow-lg shadow-[#02E7F5]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="text-sm" />
                <span className="hidden sm:inline">{label}</span>
                {badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === key ? "bg-black/20 text-black" : "bg-[#02E7F5]/20 text-[#02E7F5]"}`}>
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Tab: Account Info ── */}
          {activeTab === "info" && (
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Account Information</h2>
                {saved && (
                  <span className="flex items-center gap-2 text-green-400 text-sm font-semibold animate-fade-in">
                    <FaCheckCircle /> Saved!
                  </span>
                )}
                <button
                  onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isEditing
                      ? "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
                      : "bg-[#02E7F5]/10 border border-[#02E7F5]/30 text-[#02E7F5] hover:bg-[#02E7F5]/20"
                  }`}
                >
                  {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { name: "fullName", label: "Full Name",    icon: FaUser,     type: "text"  },
                  { name: "email",    label: "Email Address",icon: FaEnvelope, type: "email" },
                  { name: "mobile",   label: "Phone Number", icon: FaPhone,    type: "tel"   },
                ].map(({ name, label, icon: Icon, type }) => (
                  <div key={name} className={`flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 ${
                    isEditing ? "bg-white/5 border-[#02E7F5]/30" : "bg-white/[0.03] border-white/10"
                  }`}>
                    <div className="w-11 h-11 rounded-xl bg-[#02E7F5]/10 border border-[#02E7F5]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#02E7F5]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
                      {isEditing ? (
                        <input
                          type={type}
                          name={name}
                          value={editData[name]}
                          onChange={e => setEditData({ ...editData, [e.target.name]: e.target.value })}
                          className="w-full bg-transparent outline-none text-white text-base border-b border-[#02E7F5]/40 pb-1 focus:border-[#02E7F5] transition-colors"
                        />
                      ) : (
                        <p className="text-white font-semibold text-base">
                          {user[name] || <span className="text-gray-500 italic">Not provided</span>}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#02E7F5] to-[#037AEB] text-black font-bold text-base hover:from-[#02E7F5] hover:to-[#02E7F5] transition-all duration-300 shadow-lg shadow-[#02E7F5]/30 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
              )}
            </div>
          )}

          {/* ── Tab: Favorites ── */}
          {activeTab === "favorites" && (
            <div className="space-y-10">
              {favorites.length === 0 ? (
                <div className="text-center py-24 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-3xl border border-white/10">
                  <div className="text-7xl mb-5">💔</div>
                  <h3 className="text-2xl font-bold mb-3">No favorites yet</h3>
                  <p className="text-gray-400 mb-8">Start adding movies and series you love</p>
                  <Link to="/" className="px-8 py-3 bg-gradient-to-r from-[#02E7F5] to-[#037AEB] text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#02E7F5]/30">
                    Browse Content
                  </Link>
                </div>
              ) : (
                <>
                  {movieFavs.length > 0 && (
                    <FavSection title="Movies" icon={FaFilm} items={movieFavs} onRemove={removeFav} />
                  )}
                  {seriesFavs.length > 0 && (
                    <FavSection title="TV Series" icon={FaTv} items={seriesFavs} onRemove={removeFav} />
                  )}
                </>
              )}
            </div>
          )}

          {/* ── Tab: Security ── */}
          {activeTab === "security" && (
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Password",           value: "••••••••••",    action: "Change" },
                  { label: "Two-Factor Auth",    value: "Not enabled",   action: "Enable" },
                  { label: "Active Sessions",    value: "1 device",      action: "Manage" },
                  { label: "Login Notifications",value: "Enabled",       action: "Edit"   },
                ].map(({ label, value, action }) => (
                  <div key={label} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#02E7F5]/30 transition-all duration-300">
                    <div>
                      <p className="text-white font-semibold">{label}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{value}</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-[#02E7F5]/10 border border-[#02E7F5]/30 text-[#02E7F5] text-sm font-semibold hover:bg-[#02E7F5]/20 transition-all duration-300">
                      {action}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                <h3 className="text-red-400 font-bold mb-2">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back.</p>
                <button className="px-5 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-all duration-300">
                  Delete Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

// ── Favorites sub-section ──────────────────────────────────────
const FavSection = ({ title, icon: Icon, items, onRemove }) => (
  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Icon className="text-[#02E7F5]" /> {title}
        <span className="ml-1 px-2.5 py-0.5 bg-[#02E7F5]/10 border border-[#02E7F5]/30 rounded-full text-[#02E7F5] text-sm">{items.length}</span>
      </h3>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((fav, i) => (
        <div key={i} className="group relative">
          <Link to={`/${fav.cat}/${fav.title?.replace(/\s+/g, "-")}`}>
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-[#02E7F5]/60 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 shadow-lg group-hover:shadow-[#02E7F5]/20">
              <img
                src={fav.path}
                alt={fav.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { e.target.src = "https://via.placeholder.com/300x450/1a1d29/02E7F5?text=No+Image"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <p className="text-gray-400 text-xs mt-2 truncate px-1 group-hover:text-white transition-colors">{fav.title}</p>
          </Link>
          <button
            onClick={() => onRemove(fav.title)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:scale-110"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Profile;
