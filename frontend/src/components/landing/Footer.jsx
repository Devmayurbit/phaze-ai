import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-neon-purple/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-xl font-bold text-white mb-4">Phaze AI</h3>
            <p className="text-slate-400 text-sm">
              Autonomous content automation for modern creators.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-neon-purple cursor-pointer">Features</li>
              <li className="hover:text-neon-purple cursor-pointer">Pricing</li>
              <li className="hover:text-neon-purple cursor-pointer">Documentation</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-neon-purple cursor-pointer">About</li>
              <li className="hover:text-neon-purple cursor-pointer">Blog</li>
              <li className="hover:text-neon-purple cursor-pointer">Contact</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-neon-purple cursor-pointer">Privacy</li>
              <li className="hover:text-neon-purple cursor-pointer">Terms</li>
              <li className="hover:text-neon-purple cursor-pointer">Cookies</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-neon-purple/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 Phaze AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-neon-purple text-sm transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
