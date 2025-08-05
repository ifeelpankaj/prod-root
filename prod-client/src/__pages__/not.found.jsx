import React from 'react';
import { generic_msg } from '../__constants__/res.message';

const NotFoundPage = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'white',
            color: '#333',
            textAlign: 'center',
            padding: '20px'
        },
        errorCode: {
            fontSize: '8rem',
            fontWeight: 'bold',
            margin: '0',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        title: {
            fontSize: '2rem',
            margin: '20px 0 10px',
            fontWeight: '300'
        },
        message: {
            fontSize: '1.1rem',
            margin: '0 0 40px',
            opacity: '0.9',
            maxWidth: '400px'
        },
        button: {
            background: 'rgba(102, 126, 234, 0.1)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            color: '#667eea',
            padding: '12px 30px',
            fontSize: '1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
        },
        buttonHover: {
            background: 'rgba(102, 126, 234, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const handleGoHome = () => {
        // In a real app, you'd use React Router or Next.js router
        window.history.back();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.errorCode}>404</h1>
            <h2 style={styles.title}>Page Not Found</h2>
            <p style={styles.message}>{generic_msg.page_not_found}</p>
            <button
                style={{
                    ...styles.button,
                    ...(isHovered ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleGoHome}>
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;
