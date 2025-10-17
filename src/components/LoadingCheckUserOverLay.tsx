const LoadingCheckUserOverLay = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-neutral-900 dark:to-neutral-900 dark:text-white mt-18 flex items-center justify-center gap-2 dark:animate-none animate-pulse">
            <div className="w-3.5 h-3.5 bg-neutral-800 dark:bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-neutral-800 dark:bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-neutral-800 dark:bg-white rounded-full loading"></div>
        </div>
    );
}

export default LoadingCheckUserOverLay;