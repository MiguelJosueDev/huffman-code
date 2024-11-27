'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Switch } from "@nextui-org/react";
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';
import { useTheme } from "next-themes";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">TextCompressor</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Switch
          defaultSelected
          size="lg"
          color="secondary"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
          onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
        />
      </NavbarContent>
    </Navbar>
  );
}