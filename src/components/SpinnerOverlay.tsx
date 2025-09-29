const SpinnerOverlay = () => {
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center gap-2">
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
            <div className="w-3.5 h-3.5 bg-white rounded-full loading"></div>
        </div>
    );
};

export default SpinnerOverlay;
