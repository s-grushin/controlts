import { useCallback } from "react";

const useDelay = (ms = 1000) => {

    const delay = useCallback(() => new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms);
    }), [ms])

    return { delay }

}

export default useDelay