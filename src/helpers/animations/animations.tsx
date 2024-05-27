import { keyframes } from "styled-components";

export const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const slideIn = keyframes`
    from {
        transform: translateX(200%);
    }

    to {
        transform: translateX(0);
    }
`;

export const slideOut = keyframes`
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(200%);
    }
`;
