const LoadingCheckUserOverLay = () => {
    return (
        <div className="fixed inset-0 bg-neutral-900 mt-18 flex items-center justify-center gap-2">
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
        </div>
    );
}

export default LoadingCheckUserOverLay;