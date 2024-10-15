export const Footer = () => {
    return (
      <footer className="mt-auto bg-gray-900 p-6 text-center text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500">
            © 2024 <span className="font-semibold text-white">Resourify </span>. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <a
              href="https://github.com/Rudra-Sankha-Sinhamahapatra/k-explore-proj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline-block w-6 h-6 mr-2"
              >
                <path d="M12 .5a11.5 11.5 0 00-3.636 22.417c.574.105.783-.25.783-.554v-1.984c-3.183.692-3.853-1.533-3.853-1.533-.522-1.328-1.276-1.681-1.276-1.681-1.044-.713.08-.698.08-.698 1.152.081 1.756 1.184 1.756 1.184 1.026 1.755 2.692 1.248 3.345.955.106-.743.402-1.248.733-1.537-2.541-.29-5.211-1.27-5.211-5.658 0-1.249.446-2.27 1.174-3.068-.118-.29-.509-1.46.112-3.045 0 0 .96-.307 3.147 1.171a10.957 10.957 0 015.727 0c2.186-1.478 3.145-1.171 3.145-1.171.622 1.585.232 2.755.114 3.045.73.798 1.174 1.819 1.174 3.068 0 4.399-2.674 5.364-5.222 5.648.413.355.783 1.055.783 2.13v3.16c0 .306.208.665.787.553A11.5 11.5 0 0012 .5z"></path>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    );
  };
  