import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Custom component for linear progress with label
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                {/* Linear progress bar with determinate variant */}
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                {/* Display the progress value as a percentage */}
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

// PropTypes for the LinearProgressWithLabel component
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

// Component to render linear progress with dynamic value label
// export default function LinearWithValueLabel() {
//     const [progress, setProgress] = React.useState(10);

//     // Effect hook to update progress value at intervals
//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             // Update progress value, reset to 10% when reaching 100%
//             setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//         }, 800);
//         setProgress(10);
//         // Cleanup function to clear the interval
//         return () => {
//             clearInterval(timer);
//         };
//     }, []);

//     return (
//         <Box sx={{ width: '100%' }}>
//             {/* Render LinearProgressWithLabel with dynamic progress value */}
//             <LinearProgressWithLabel value={progress} />
//         </Box>
//     );
// }

export default function LinearWithValueLabel({ percent }) {
    const [progress, setProgress] = React.useState(percent);

    React.useEffect(() => {
        // Update progress value when the percent prop changes
        setProgress(percent);
    }, [percent]);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Render LinearProgressWithLabel with dynamic progress value */}
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}