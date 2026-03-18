import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { galleryImages, videoItems } from "../data/site";

export default function ExperiencePage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-[92rem] px-4 py-12 sm:px-6 xl:px-8 2xl:px-10 lg:py-16">
      <SectionIntro eyebrow="Experience" title="Video and gallery storytelling designed to make the brand feel tangible." description="From private dining to chef presentation, this page gives restaurant prospects and agency clients a polished visual narrative." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {videoItems.map((video, index) => (
          <MotionBlock key={video.title} delay={index * 0.08} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_55px_rgba(221,210,192,0.32)]">
            <button type="button" className="block w-full text-left" onClick={() => setActiveVideo(video.title)}>
              <div className="relative">
                <img src={video.image} alt={video.title} className="h-80 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xl font-semibold">{video.title}</p>
                    <p className="mt-2 text-sm text-white/75">{video.description}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">Play</span>
                </div>
              </div>
            </button>
          </MotionBlock>
        ))}
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <MotionBlock key={image} delay={index * 0.04}>
            <img src={image} alt={`Maison Ember gallery ${index + 1}`} className="h-72 w-full rounded-[2rem] object-cover" />
          </MotionBlock>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo ? (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-stone-950/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Video Preview</p>
                  <h3 className="mt-3 text-2xl font-semibold text-stone-900">{activeVideo}</h3>
                </div>
                <button type="button" onClick={() => setActiveVideo(null)} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700">Close</button>
              </div>
              <div className="mt-6 grid h-80 place-items-center rounded-[1.75rem] bg-stone-100 text-center text-stone-500">
                Premium video modal placeholder for reels, ambiance films, or chef presentation.
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

