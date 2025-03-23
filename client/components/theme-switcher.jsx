'use client';

import { cn } from '@/lib/utils';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Monitor, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion'; // Note: changed from motion/react to framer-motion
import { useEffect, useState } from 'react';
import { useTheme } from '@/providers/Themeprovider';

const themes = [
  {
    key: 'system',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
];



export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = 'light',
  className,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [localTheme, setLocalTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value || theme,
    onChange: (newTheme) => {
      onChange?.(newTheme);
      setTheme(newTheme);
    },
  });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme && theme !== localTheme) {
      setLocalTheme(theme);
    }
  }, [theme, localTheme, setLocalTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = localTheme === key;

        return (
          <button
            type="button"
            key={key}
            className="relative h-6 w-6 rounded-full"
            onClick={() => setLocalTheme(key)}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-secondary"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};