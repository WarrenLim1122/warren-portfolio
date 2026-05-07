import { useState } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

type ContactId = 'email' | 'linkedin' | 'phone';

const contacts: {
  id: ContactId;
  Icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  hoverBg: string;
  glowColor: string;
}[] = [
  {
    id: 'email',
    Icon: Mail,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    hoverBg: '#D93025',
    glowColor: 'rgba(217, 48, 37, 0.55)',
  },
  {
    id: 'linkedin',
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/warrenlimzf',
    href: `https://${PERSONAL_INFO.linkedin}`,
    hoverBg: '#0077B5',
    glowColor: 'rgba(0, 119, 181, 0.55)',
  },
  {
    id: 'phone',
    Icon: Phone,
    label: 'Phone',
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
    hoverBg: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.55)',
  },
];

export const ContactConnect = () => {
  const [hovered, setHovered] = useState<ContactId | null>(null);

  return (
    <div className="w-full pt-10 border-t border-gray-100">
      {/* Glass card container */}
      <div
        className="rounded-3xl border border-gray-200/80 backdrop-blur-md overflow-hidden p-8 transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.72)',
          boxShadow: '0 4px 32px rgba(15,48,87,0.07), 0 1px 0 rgba(255,255,255,0.9) inset',
        }}
      >
        <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
          {contacts.map(({ id, Icon, label, value, href, hoverBg, glowColor }) => {
            const isHovered = hovered === id;
            return (
              <a
                key={id}
                href={href}
                target={id === 'linkedin' ? '_blank' : undefined}
                rel={id === 'linkedin' ? 'noreferrer' : undefined}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col items-center gap-3 no-underline select-none"
              >
                {/* Circular icon */}
                <div
                  style={{
                    background: isHovered ? hoverBg : 'rgba(15,48,87,0.04)',
                    boxShadow: isHovered
                      ? `0 0 22px ${glowColor}, 0 8px 28px rgba(0,0,0,0.10)`
                      : '0 2px 12px rgba(0,0,0,0.06)',
                    transform: isHovered ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: `1px solid ${isHovered ? 'transparent' : 'rgba(15,48,87,0.08)'}`,
                  }}
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                >
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    style={{
                      color: isHovered ? '#fff' : '#0F3057',
                      animation: isHovered ? 'contact-shake 0.5s ease' : 'none',
                    }}
                  />
                </div>

                {/* Label + value */}
                <div className="text-center space-y-0.5">
                  <p
                    style={{
                      opacity: isHovered ? 1 : 0.45,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500"
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      transform: isHovered ? 'translateY(2px)' : 'translateY(0)',
                      transition: 'transform 0.3s ease',
                      opacity: isHovered ? 1 : 0.6,
                    }}
                    className="text-[11px] font-semibold text-navy truncate max-w-[160px] transition-opacity duration-300"
                  >
                    {value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
