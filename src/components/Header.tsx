// 'use client'

// import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// const Header = () => {
//   const router = useRouter();

//   const handleNavigate = () => {
//     router.push('/products/add');
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={1}
//       sx={{
//         backgroundColor: '#0a0a0a',
//         color: '#333',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//         px: { xs: 2, md: 6 },
//         py: 1.5,
//       }}
//     >
//       <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
//         {/* Title */}
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 700,
//             fontFamily: `'Segoe UI', sans-serif`,
//             color: 'white',
//           }}
//         >
//           Product App
//         </Typography>

//           <Link  href={'/'} className=' '>
//           <Button >Home</Button>
//           </Link>
//         {/* Add Product Button */}
//         <Button
//           onClick={handleNavigate}
//           sx={{
//             backgroundColor: '#ffffff',
//             color: 'black',
//             textTransform: 'none',
//             fontWeight: 500,
//             px: 3,
//             py: 1.2,
//             borderRadius: '8px',
//             boxShadow: '0 2px 8px rgba(13, 110, 253, 0.2)',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               backgroundColor: '#0b5ed7',
//             },
//           }}
//         >
//           + Add Product
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;





'use client';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/products/add');
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
         backgroundColor: '#0a0a0a',
    color: '#fff',
    px: { xs: 2, md: 6 },
    py: 1.5,
    boxShadow: '0 4px 10px rgba(255, 255, 255, 0.08)', // subtle white shadow
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: `sans-serif`,
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: 'white',
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          Product App
        </Typography>

        {/* Home button */}
        <Box sx={{ position: 'absolute', left: 24 }}>
          <Link href="/" passHref>
            <Button sx={{ color: '#fff', fontFamily: `'Poppins', sans-serif` }}>
              Home
            </Button>
          </Link>
        </Box>

        {/* Add Product button */}
        <Box sx={{ position: 'absolute', right: 24 }}>
          <Button
            onClick={handleNavigate}
            sx={{
              backgroundColor: '#ffffff',
              color: 'black',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1.2,
              fontFamily: `'Poppins', sans-serif`,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(13, 110, 253, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#0b5ed7',
                color: '#fff',
              },
            }}
          >
            + Add Product
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
