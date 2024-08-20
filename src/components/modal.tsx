type Props = {
  title: string;
  children: React.ReactNode;
  controls: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ title, children, controls, onClose }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none">
      <div className="relative bg-black/50 bg-cover h-full w-full">
        <div className="flex justify-center">
          <div className="pointer-events-auto m-4 flex flex-col w-1/2 rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5 className="font-medium leading-normal">{title}</h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                onClick={onClose}
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-twe-modal-body-ref>
              {children}
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              {controls}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
