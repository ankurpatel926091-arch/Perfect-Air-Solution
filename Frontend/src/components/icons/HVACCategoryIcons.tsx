import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Split Air Conditioner (Indoor High-Wall Unit with Cooling Airflow)
export const SplitAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wall mounting base */}
    <rect x="6" y="14" width="52" height="24" rx="4" stroke="#059669" strokeWidth="2.5" fill="#ECFDF5" />
    {/* Top air intake vents */}
    <line x1="12" y1="18" x2="52" y2="18" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
    <line x1="12" y1="22" x2="52" y2="22" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
    {/* Bottom discharge flap / louver */}
    <path d="M10 32C18 35 46 35 54 32" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
    {/* LED Display Screen & Power Indicator */}
    <rect x="42" y="25" width="8" height="4" rx="1" fill="#059669" />
    <circle cx="38" cy="27" r="1.2" fill="#10B981" />
    {/* Airflow cooling waves */}
    <path d="M14 42C16 46 19 48 24 49" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 42C30 47 33 50 38 51" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M42 42C44 46 47 48 52 49" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Ceiling Cassette AC (4-Way Directional Airflow & Honeycomb Center)
export const CassetteAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer square frame */}
    <rect x="8" y="8" width="48" height="48" rx="6" stroke="#2563EB" strokeWidth="2.5" fill="#EFF6FF" />
    {/* Corner mounting bevels */}
    <path d="M8 18L18 8M46 8L56 18M56 46L46 56M18 56L8 46" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
    {/* Inner intake grille */}
    <rect x="20" y="20" width="24" height="24" rx="3" stroke="#1D4ED8" strokeWidth="2" fill="#DBEAFE" />
    {/* Honeycomb / louver slats */}
    <line x1="25" y1="26" x2="39" y2="26" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="25" y1="32" x2="39" y2="32" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="25" y1="38" x2="39" y2="38" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
    {/* 4-way directional discharge slots */}
    <line x1="22" y1="13" x2="42" y2="13" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="22" y1="51" x2="42" y2="51" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="13" y1="22" x2="13" y2="42" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="51" y1="22" x2="51" y2="42" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Ductable Air Conditioner (Concealed Ducted Indoor Unit with Diffusers)
export const DuctableAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main blower box */}
    <rect x="6" y="16" width="34" height="26" rx="3" stroke="#4F46E5" strokeWidth="2.5" fill="#EEF2FF" />
    {/* Service inspection panel */}
    <rect x="11" y="21" width="14" height="16" rx="2" stroke="#818CF8" strokeWidth="1.8" />
    <circle cx="21" cy="29" r="1.5" fill="#4F46E5" />
    {/* Internal fan wheel circle */}
    <circle cx="31" cy="29" r="4.5" stroke="#6366F1" strokeWidth="1.8" strokeDasharray="3 2" />
    {/* Duct transition / collar */}
    <path d="M40 22L56 18V40L40 36V22Z" stroke="#4338CA" strokeWidth="2.5" fill="#E0E7FF" />
    {/* Air distribution slots on duct */}
    <line x1="45" y1="23" x2="45" y2="35" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="50" y1="22" x2="50" y2="36" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" />
    {/* Cool breeze discharge arrows */}
    <path d="M12 48L18 54M24 48L30 54M36 48L42 54" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 4. VRF / VRV Central Outdoor Unit (Modular Inverter Cabinet with Dual Fans)
export const VrfSystemIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Heavy outdoor cabinet */}
    <rect x="14" y="6" width="36" height="52" rx="4" stroke="#0284C7" strokeWidth="2.5" fill="#F0F9FF" />
    {/* Top fan shroud 1 */}
    <circle cx="32" cy="18" r="7.5" stroke="#0369A1" strokeWidth="2" fill="#E0F2FE" />
    <circle cx="32" cy="18" r="2.5" fill="#0284C7" />
    <path d="M32 10.5V15.5M32 20.5V25.5M24.5 18H29.5M34.5 18H39.5" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    {/* Bottom intake louver grille */}
    <line x1="20" y1="32" x2="44" y2="32" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="37" x2="44" y2="37" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="42" x2="44" y2="42" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="47" x2="44" y2="47" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    {/* Base support brackets */}
    <line x1="10" y1="58" x2="54" y2="58" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 5. Floor Standing Tower AC (Tall Elegant Column with Vertical Louvers)
export const TowerAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main columnar tower */}
    <rect x="20" y="6" width="24" height="50" rx="3" stroke="#D97706" strokeWidth="2.5" fill="#FFFBEB" />
    {/* Top air discharge panel */}
    <rect x="24" y="10" width="16" height="20" rx="1.5" stroke="#B45309" strokeWidth="1.8" fill="#FEF3C7" />
    <line x1="28" y1="14" x2="28" y2="26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="32" y1="14" x2="32" y2="26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="36" y1="14" x2="36" y2="26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    {/* Center digital touch display */}
    <circle cx="32" cy="35" r="3" stroke="#D97706" strokeWidth="1.8" fill="#FFF" />
    <circle cx="32" cy="35" r="1.2" fill="#D97706" />
    {/* Lower suction intake grille */}
    <line x1="24" y1="42" x2="40" y2="42" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="46" x2="40" y2="46" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="50" x2="40" y2="50" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    {/* Pedestal base */}
    <path d="M16 56H48" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 6. Central Chiller & Plant (Dual Barrels & Industrial Screw Compressor)
export const ChillerPlantIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bottom evaporator cylinder barrel */}
    <rect x="8" y="32" width="48" height="18" rx="6" stroke="#0D9488" strokeWidth="2.5" fill="#F0FDFA" />
    <line x1="16" y1="36" x2="48" y2="36" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="42" x2="48" y2="42" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="46" x2="48" y2="46" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
    {/* Top screw compressor */}
    <rect x="18" y="16" width="28" height="14" rx="4" stroke="#0F766E" strokeWidth="2.2" fill="#CCFBF1" />
    {/* Piping connect tubes */}
    <path d="M24 30V18M40 30V18" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
    {/* Flanged water headers */}
    <rect x="4" y="36" width="5" height="10" rx="1" fill="#0D9488" />
    <rect x="55" y="36" width="5" height="10" rx="1" fill="#0D9488" />
    {/* Base steel skid legs */}
    <line x1="12" y1="50" x2="12" y2="56" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="52" y1="50" x2="52" y2="56" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 7. Air Handling Unit - AHU (Modular Box with Centrifugal Blower & Filters)
export const AhuIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Double skin casing */}
    <rect x="6" y="14" width="52" height="36" rx="4" stroke="#047857" strokeWidth="2.5" fill="#ECFDF5" />
    {/* Internal dividing bulkhead */}
    <line x1="32" y1="14" x2="32" y2="50" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
    {/* Filter section (left side) */}
    <path d="M12 20L18 44M18 20L24 44M24 20L30 44" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    {/* Centrifugal blower scroll & impeller (right side) */}
    <circle cx="43" cy="32" r="8" stroke="#047857" strokeWidth="2" fill="#D1FAE5" />
    <circle cx="43" cy="32" r="2.5" fill="#047857" />
    <path d="M43 24V28M43 36V40M35 32H39M47 32H51" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
    {/* Access door latches */}
    <circle cx="10" cy="32" r="1.5" fill="#047857" />
    <circle cx="54" cy="32" r="1.5" fill="#047857" />
  </svg>
);

// 8. Cold Room & Cold Storage (Insulated Camlock Panels & Heavy Freezer Door)
export const ColdRoomIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Walk-in insulated chamber */}
    <rect x="8" y="10" width="48" height="46" rx="4" stroke="#0284C7" strokeWidth="2.5" fill="#F0F9FF" />
    {/* Heavy freezer door outline */}
    <rect x="14" y="16" width="22" height="34" rx="2" stroke="#0369A1" strokeWidth="2" fill="#E0F2FE" />
    {/* Safety latch handle */}
    <rect x="30" y="30" width="4" height="8" rx="1.5" fill="#0284C7" />
    <line x1="28" y1="34" x2="34" y2="34" stroke="#0C4A6E" strokeWidth="2" strokeLinecap="round" />
    {/* Digital temperature controller gauge */}
    <rect x="40" y="18" width="12" height="14" rx="2" stroke="#0284C7" strokeWidth="1.8" fill="#FFF" />
    <text x="42" y="28" fontSize="8" fontWeight="bold" fill="#0284C7" fontFamily="sans-serif">-18°</text>
    {/* Frost snowflake badge */}
    <path d="M46 38V48M41 43H51M42.5 39.5L49.5 46.5M42.5 46.5L49.5 39.5" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 9. Ventilation & Exhaust System (Industrial Centrifugal Duct Fan)
export const VentilationIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Circular duct housing */}
    <circle cx="32" cy="32" r="22" stroke="#7C3AED" strokeWidth="2.5" fill="#F5F3FF" />
    <circle cx="32" cy="32" r="14" stroke="#8B5CF6" strokeWidth="1.8" strokeDasharray="3 3" />
    {/* Fan center motor hub */}
    <circle cx="32" cy="32" r="5" stroke="#6D28D9" strokeWidth="2" fill="#DDD6FE" />
    {/* Curved aerodynamic fan blades */}
    <path d="M32 27C32 18 39 16 42 18C41 23 37 27 32 27Z" fill="#7C3AED" />
    <path d="M37 32C46 32 48 39 46 42C41 41 37 37 37 32Z" fill="#7C3AED" />
    <path d="M32 37C32 46 25 48 22 46C23 41 27 37 32 37Z" fill="#7C3AED" />
    <path d="M27 32C18 32 16 25 18 22C23 23 27 27 27 32Z" fill="#7C3AED" />
    {/* Duct mounting brackets */}
    <line x1="6" y1="32" x2="10" y2="32" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
    <line x1="54" y1="32" x2="58" y2="32" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 10. Window AC (Compact Metal Chassis with Louvers & Control Knobs)
export const WindowAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Solid box frame */}
    <rect x="8" y="14" width="48" height="36" rx="4" stroke="#EA580C" strokeWidth="2.5" fill="#FFF7ED" />
    {/* Cooling coil discharge louvers (left 65%) */}
    <rect x="13" y="19" width="26" height="26" rx="2" stroke="#F97316" strokeWidth="1.8" fill="#FFEDD5" />
    <line x1="17" y1="24" x2="35" y2="24" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="29" x2="35" y2="29" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="34" x2="35" y2="34" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="39" x2="35" y2="39" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    {/* Right side control panel */}
    <rect x="42" y="19" width="10" height="26" rx="2" stroke="#C2410C" strokeWidth="1.8" fill="#FFF" />
    <circle cx="47" cy="25" r="2.5" stroke="#EA580C" strokeWidth="1.8" fill="#FFEDD5" />
    <circle cx="47" cy="33" r="2.5" stroke="#EA580C" strokeWidth="1.8" fill="#FFEDD5" />
    <rect x="45" y="39" width="4" height="2" rx="0.5" fill="#EA580C" />
  </svg>
);

// 11. Modular OT & Clean Room (Sterile Ceiling Laminar Airflow & Medical Cross)
export const CleanRoomIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ceiling plenum hood */}
    <path d="M10 12H54L48 24H16L10 12Z" stroke="#9333EA" strokeWidth="2.5" fill="#FAF5FF" />
    <line x1="16" y1="24" x2="48" y2="24" stroke="#A855F7" strokeWidth="2" />
    {/* HEPA grid texture */}
    <line x1="22" y1="16" x2="24" y2="20" stroke="#C084FC" strokeWidth="1.6" />
    <line x1="31" y1="16" x2="33" y2="20" stroke="#C084FC" strokeWidth="1.6" />
    <line x1="40" y1="16" x2="42" y2="20" stroke="#C084FC" strokeWidth="1.6" />
    {/* Downward laminar clean airflow */}
    <line x1="20" y1="28" x2="20" y2="38" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
    <line x1="44" y1="28" x2="44" y2="38" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
    {/* Medical sterile cross badge */}
    <rect x="26" y="36" width="12" height="16" rx="2" stroke="#7E22CE" strokeWidth="2" fill="#F3E8FF" />
    <path d="M32 40V48M28 44H36" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
    {/* Sterile sparkles */}
    <path d="M14 46L16 43L18 46L16 49Z" fill="#A855F7" />
    <path d="M48 46L50 43L52 46L50 49Z" fill="#A855F7" />
  </svg>
);

// 12. Commercial Deep Freezer (Double Glass Top Sliding Doors & Deep Chest)
export const CommercialFreezerIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Chest cabinet body */}
    <rect x="8" y="20" width="48" height="34" rx="4" stroke="#E11D48" strokeWidth="2.5" fill="#FFF1F2" />
    {/* Angled glass sliding lids */}
    <path d="M8 20L14 12H50L56 20H8Z" stroke="#BE123C" strokeWidth="2" fill="#FFE4E6" />
    <line x1="32" y1="12" x2="32" y2="20" stroke="#E11D48" strokeWidth="2" />
    {/* Recessed door handles */}
    <rect x="18" y="15" width="8" height="2" rx="1" fill="#E11D48" />
    <rect x="38" y="15" width="8" height="2" rx="1" fill="#E11D48" />
    {/* Lower ventilation motor grille */}
    <line x1="38" y1="40" x2="50" y2="40" stroke="#FB7185" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="38" y1="44" x2="50" y2="44" stroke="#FB7185" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="38" y1="48" x2="50" y2="48" stroke="#FB7185" strokeWidth="1.8" strokeLinecap="round" />
    {/* Digital frost status */}
    <circle cx="18" cy="38" r="4" stroke="#E11D48" strokeWidth="1.8" fill="#FFF" />
    <path d="M18 36V40M16 38H20" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
    {/* Heavy duty casters */}
    <circle cx="14" cy="56" r="2.5" fill="#BE123C" />
    <circle cx="50" cy="56" r="2.5" fill="#BE123C" />
  </svg>
);

// 13. Commercial Heat Pump (Outdoor Coil with Heating Flames & Cooling Wave)
export const HeatPumpIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Heat pump outdoor box */}
    <rect x="8" y="12" width="48" height="42" rx="4" stroke="#DC2626" strokeWidth="2.5" fill="#FEF2F2" />
    {/* Main fan circle */}
    <circle cx="28" cy="33" r="14" stroke="#B91C1C" strokeWidth="2" fill="#FEE2E2" />
    <circle cx="28" cy="33" r="4" fill="#DC2626" />
    <path d="M28 21V29M28 37V45M16 33H24M32 33H40" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
    {/* Flame / heat symbol on the right */}
    <path d="M47 22C47 22 51 25 51 29C51 32 49 34 47 34C45 34 43 32 43 29C43 25 47 22 47 22Z" fill="#DC2626" />
    {/* Cool breeze wave on bottom right */}
    <path d="M42 42C44 40 47 40 49 42M42 46C45 44 48 44 51 46" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
    {/* Stand mounts */}
    <line x1="12" y1="54" x2="12" y2="58" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="52" y1="54" x2="52" y2="58" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 14. Water Cooler & Dispenser (Commercial Stainless Steel Cabinet with Taps)
export const WaterCoolerIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tall cooler tower */}
    <rect x="18" y="8" width="28" height="48" rx="3" stroke="#2563EB" strokeWidth="2.5" fill="#EFF6FF" />
    {/* Top water basin sink */}
    <path d="M22 18H42L39 26H25L22 18Z" stroke="#1D4ED8" strokeWidth="1.8" fill="#DBEAFE" />
    {/* Swan neck faucets / taps */}
    <path d="M28 18V13C28 11 30 11 30 13V14" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 18V13C34 11 36 11 36 13V14" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
    {/* Water drop falling */}
    <path d="M32 20C32 20 34 22 34 23.5C34 24.5 33 25.5 32 25.5C31 25.5 30 24.5 30 23.5C30 22 32 20 32 20Z" fill="#3B82F6" />
    {/* Ventilation intake louvers */}
    <line x1="24" y1="36" x2="40" y2="36" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="41" x2="40" y2="41" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="46" x2="40" y2="46" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
    {/* Base plate */}
    <line x1="14" y1="56" x2="50" y2="56" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 15. Air Purifiers & Filtration (Cylindrical Tower with 360 Intake & Clean Air)
export const AirPurifierIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Slim purifier body */}
    <rect x="20" y="12" width="24" height="44" rx="5" stroke="#059669" strokeWidth="2.5" fill="#ECFDF5" />
    {/* Top air output grille */}
    <line x1="24" y1="16" x2="40" y2="16" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
    {/* Digital OLED air quality ring */}
    <circle cx="32" cy="24" r="3.5" stroke="#10B981" strokeWidth="1.8" fill="#FFF" />
    <circle cx="32" cy="24" r="1.5" fill="#059669" />
    {/* 360-degree micro intake holes */}
    <circle cx="25" cy="33" r="1" fill="#10B981" />
    <circle cx="32" cy="33" r="1" fill="#10B981" />
    <circle cx="39" cy="33" r="1" fill="#10B981" />
    <circle cx="28" cy="38" r="1" fill="#10B981" />
    <circle cx="35" cy="38" r="1" fill="#10B981" />
    <circle cx="25" cy="43" r="1" fill="#10B981" />
    <circle cx="32" cy="43" r="1" fill="#10B981" />
    <circle cx="39" cy="43" r="1" fill="#10B981" />
    <circle cx="28" cy="48" r="1" fill="#10B981" />
    <circle cx="35" cy="48" r="1" fill="#10B981" />
    {/* Clean air expulsion sparkles */}
    <path d="M14 10C16 7 20 8 22 10" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M50 10C48 7 44 8 42 10" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 16. Precision AC - PAC for Data Centers (Server Rack Air Handler Unit)
export const PrecisionAcIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Server rack style cabinet */}
    <rect x="14" y="6" width="36" height="52" rx="3" stroke="#334155" strokeWidth="2.5" fill="#F8FAFC" />
    {/* Top status controller */}
    <rect x="19" y="11" width="26" height="8" rx="2" stroke="#475569" strokeWidth="1.8" fill="#E2E8F0" />
    <circle cx="23" cy="15" r="1.5" fill="#0284C7" />
    <line x1="28" y1="15" x2="41" y2="15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    {/* Perforated high CFM airflow mesh doors */}
    <rect x="19" y="23" width="26" height="28" rx="2" stroke="#475569" strokeWidth="1.8" fill="#FFF" />
    <line x1="23" y1="28" x2="41" y2="28" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    <line x1="23" y1="33" x2="41" y2="33" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    <line x1="23" y1="38" x2="41" y2="38" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    <line x1="23" y1="43" x2="41" y2="43" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    {/* Dual door center split line */}
    <line x1="32" y1="23" x2="32" y2="51" stroke="#475569" strokeWidth="1.5" />
  </svg>
);

// 17. Annual Maintenance AMC (Pressure Gauge Manifold & Service Wrench)
export const AmcServiceIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dual pressure gauge manifold body */}
    <rect x="20" y="24" width="24" height="8" rx="2" stroke="#1E40AF" strokeWidth="2.5" fill="#DBEAFE" />
    {/* Left blue low-pressure gauge */}
    <circle cx="23" cy="16" r="8" stroke="#0284C7" strokeWidth="2.2" fill="#F0F9FF" />
    <path d="M23 16L27 13" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    {/* Right red high-pressure gauge */}
    <circle cx="41" cy="16" r="8" stroke="#DC2626" strokeWidth="2.2" fill="#FEF2F2" />
    <path d="M41 16L45 13" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
    {/* Service valve knobs */}
    <circle cx="23" cy="36" r="2.5" fill="#0284C7" />
    <circle cx="41" cy="36" r="2.5" fill="#DC2626" />
    {/* Manifold center hook */}
    <path d="M32 24V10C32 8 34 8 34 10" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
    {/* Service technician wrench */}
    <path d="M12 48L24 38L28 42L16 52L12 48Z" stroke="#3B82F6" strokeWidth="2" fill="#EFF6FF" />
    <path d="M10 46L14 42L16 44L12 48" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 18. AC Installation & Piping (Dual Insulated Copper Coils with Brass Flare Nuts)
export const AcInstallationIcon: React.FC<IconProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Thick insulated copper suction pipe */}
    <path d="M10 22C20 22 22 42 34 42C44 42 46 22 54 22" stroke="#0891B2" strokeWidth="5" strokeLinecap="round" />
    {/* Thin copper liquid pipe */}
    <path d="M10 28C20 28 22 46 34 46C44 46 46 28 54 28" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    {/* Brass flare nuts */}
    <rect x="6" y="19" width="6" height="12" rx="1.5" stroke="#B45309" strokeWidth="1.8" fill="#FDE68A" />
    <rect x="52" y="19" width="6" height="12" rx="1.5" stroke="#B45309" strokeWidth="1.8" fill="#FDE68A" />
    {/* Precision spirit level gauge */}
    <rect x="18" y="10" width="28" height="7" rx="2" stroke="#06B6D4" strokeWidth="1.8" fill="#ECFEFF" />
    <circle cx="32" cy="13.5" r="2" fill="#0891B2" />
  </svg>
);
