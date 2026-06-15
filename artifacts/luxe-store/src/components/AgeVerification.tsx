import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "inloveco_age_verified";

export default function AgeVerification() {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem(SESSION_KEY);
    if (!verified) setVisible(true);
  }, []);

  function handleAllow() {
    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(false);
  }

  function handleDeny() {
    setDenied(true);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0a08]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-[#c9a96e]/[0.06] blur-[80px]" />
          </div>

          <motion.div
            className="relative w-full max-w-[420px] mx-5 border border-[#c9a96e]/20 bg-[#0d0a08]/90 backdrop-blur-md px-12 py-14 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner ornaments */}
            <span className="absolute top-3 left-3 h-5 w-5 border-t border-l border-[#c9a96e]/50" />
            <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#c9a96e]/50" />

            <AnimatePresence mode="wait">
              {!denied ? (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Wordmark */}
                  <p className="font-['Cormorant_Garamond',serif] font-light tracking-[0.28em] uppercase text-[#c9a96e] text-[0.95rem] mb-8">
                    InLove &amp; Co.
                  </p>

                  {/* Divider */}
                  <div className="mx-auto mb-8 h-px w-10 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

                  <h1 className="font-['Cormorant_Garamond',serif] font-light italic text-[1.5rem] leading-snug text-[#f5f0e8] mb-3">
                    You must be of age<br />to enter this world.
                  </h1>

                  <p className="text-[0.68rem] font-light tracking-[0.1em] text-[#7a7060] leading-loose mb-10">
                    This site contains content intended<br />
                    for adults aged 18 and above.<br />
                    Please confirm your age to continue.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-7">
                    <button
                      onClick={handleAllow}
                      className="text-[0.62rem] font-medium tracking-[0.18em] uppercase px-4 py-3.5 bg-[#c9a96e] border border-[#c9a96e] text-[#0d0a08] transition-colors hover:bg-[#e0c99a] hover:border-[#e0c99a] cursor-pointer"
                    >
                      I am 18+
                    </button>
                    <button
                      onClick={handleDeny}
                      className="text-[0.62rem] font-medium tracking-[0.18em] uppercase px-4 py-3.5 bg-transparent border border-[#c9a96e]/30 text-[#7a7060] transition-colors hover:border-[#c9a96e] hover:text-[#f5f0e8] cursor-pointer"
                    >
                      I am under 18
                    </button>
                  </div>

                  <p className="text-[0.58rem] tracking-[0.08em] text-[#7a7060]/60 leading-relaxed">
                    By entering, you confirm you are of legal age<br />
                    in your country or territory of residence.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[1.6rem] text-[#c9a96e]/40 mb-5">✦</p>
                  <p className="font-['Cormorant_Garamond',serif] font-light italic text-[1.35rem] text-[#f5f0e8] mb-3">
                    Access Restricted
                  </p>
                  <p className="text-[0.68rem] tracking-[0.1em] text-[#7a7060] leading-loose">
                    We're sorry — this sanctuary<br />
                    is reserved for adults only.<br /><br />
                    Please come back when you are of age.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
