import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { Language as LanguageIcon, ExpandMore, Check } from '@mui/icons-material';

const LanguageSelector = ({ variant = 'outlined', size = 'medium' }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', category: 'Popular' },
    { code: 'es', name: 'Español', flag: '🇪🇸', category: 'Popular' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', category: 'Popular' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', category: 'Popular' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳', category: 'Asian' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', category: 'Asian' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', category: 'Asian' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', category: 'Asian' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', category: 'Asian' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', category: 'Asian' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', category: 'Other' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', category: 'Other' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', category: 'Other' },
    { code: 'jv', name: 'Javanese', flag: '🇮🇩', category: 'Other' },
    { code: 'tl', name: 'Tagalog', flag: '🇵🇭', category: 'Other' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦', category: 'Other' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleClose();
    
    // Handle RTL
    if (langCode === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  // Group languages by category
  const groupedLanguages = languages.reduce((acc, lang) => {
    if (!acc[lang.category]) acc[lang.category] = [];
    acc[lang.category].push(lang);
    return acc;
  }, {});

  return (
    <Box>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        endIcon={<ExpandMore />}
        startIcon={<LanguageIcon />}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ddd',
          borderRadius: '8px',
          textTransform: 'none',
          minWidth: '140px',
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" component="span">
            {currentLanguage.flag}
          </Typography>
          <Typography variant="body2" component="span">
            {currentLanguage.name}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: '400px',
            width: '280px',
            mt: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.entries(groupedLanguages).map(([category, langs], categoryIndex) => (
          <Box key={category}>
            {categoryIndex > 0 && <Divider />}
            
            {/* Category Header */}
            <Box sx={{ px: 2, py: 1, backgroundColor: '#f8f9fa' }}>
              <Typography variant="caption" color="text.secondary" fontWeight="600">
                {category}
              </Typography>
            </Box>

            {/* Languages in Category */}
            {langs.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                selected={i18n.language === language.code}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#f0f7ff',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    '&:hover': {
                      backgroundColor: '#bbdefb',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <Typography variant="h6" component="span">
                    {language.flag}
                  </Typography>
                </ListItemIcon>
                
                <ListItemText
                  primary={language.name}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: i18n.language === language.code ? 600 : 400
                  }}
                />
                
                {i18n.language === language.code && (
                  <Check color="primary" fontSize="small" />
                )}
              </MenuItem>
            ))}
          </Box>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;