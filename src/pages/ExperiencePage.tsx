import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { galleryImages, videoItems, type VideoItem } from "../data/site";

export default function ExperiencePage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <SectionIntro eyebrow="Experience" title="Video and gallery storytelling designed to make the brand feel tangible." description="From chef finishing shots to polished hospitality reels, this page now includes real restaurant-style video content for a stronger portfolio presentation." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {videoItems.map((video, index) => (
          <MotionBlock key={video.title} delay={index * 0.08} className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_55px_rgba(221,210,192,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(210,184,150,0.35)]">
            <button type="button" className="block w-full text-left" onClick={() => setActiveVideo(video)}>
              <div className="relative h-80 overflow-hidden">
                <video src={video.videoUrl} poster={video.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" autoPlay muted loop playsInline preload="metadata" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-stone-900 shadow-lg">
                  {video.tag}
                </div>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xl font-semibold">{video.title}</p>
                    <p className="mt-2 text-sm text-white/75">{video.description}</p>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/20 text-sm font-semibold backdrop-brightness-110">
                    Play
                  </span>
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
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-stone-950/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 24 }} className="w-full max-w-5xl rounded-[2rem] bg-white p-4 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Video Preview</p>
                  <h3 className="mt-3 text-2xl font-semibold text-stone-900">{activeVideo.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600">{activeVideo.description}</p>
                </div>
                <button type="button" onClick={() => setActiveVideo(null)} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700">Close</button>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-stone-950">
                <video key={activeVideo.videoUrl} src={activeVideo.videoUrl} poster={activeVideo.image} className="aspect-video w-full object-cover" controls autoPlay playsInline preload="metadata" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
