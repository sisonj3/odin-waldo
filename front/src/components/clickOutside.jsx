import { useEffect } from "react";

export default function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            const dropDown = document.querySelector('#characters');
            const submitBtn = document.querySelector('#charSubmit');

            console.log(ref.current);
            console.log(event.target);

            if (ref.current && !ref.current.contains(event.target) && !event.target.contains(dropDown) && !event.target.contains(submitBtn)) {
                document.querySelector('#selectedArea').hidden = true;
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
