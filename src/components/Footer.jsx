import { Earth, MessageCircle, SendHorizontal, XCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-between items-center border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="min-[1000px]:w-3/4 w-full px-6 py-6">
        <div className="flex gap-8 md:items-start md:justify-between">
          <div className="hidden min-[750px]:block space-y-3 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">FinPilot</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A clean and simple dashboard for tracking income, expenses, and insights. Stay on top of your money with intuitive charts and quick controls.
            </p>
          </div>

          <div>
            <div className="sm:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Follow us</h3>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col min-[450px]:flex-row gap-3">
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800">
                        <Earth size={16} />
                        facebook.com/finpilot
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800">
                        <SendHorizontal size={16} />
                        instagram.com/finpilot
                    </a>
                </div>
                <div className="flex flex-col min-[450px]:flex-row gap-3">
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800">
                        <XCircle size={16} />
                        x.com/finpilot
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800">
                        <MessageCircle size={16} />
                        whatsapp.com/finpilot
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-5 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p>© {new Date().getFullYear()} Finance Dash. All rights reserved.</p>
          <p>Made for intuitive money management.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
