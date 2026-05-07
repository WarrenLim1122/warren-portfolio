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
    glowColor: 'rgba(217, 48, 37, 0.5)',
  },
  {
    id: 'linkedin',
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/warrenlimzf',
    href: `https://${PERSONAL_INFO.linkedin}`,
    hoverBg: '#0077B5',
    glowColor: 'rgba(0, 119, 181, 0.5)',
  },
  {
    id: 'phone',
    Icon: Phone,
    label: 'Phone',
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
    hoverBg: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.5)',
  },
];

export const ContactConnect = () => {
  const [hovered, setHovered] = useState<ContactId | null>(null);

  return (
    <div className="w-full pt-8 border-t border-white/8">
      <div
        className="rounded-2xl border border-white/8 overflow-hidden p-7 transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset',
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
                <div
                  style={{
                    background: isHovered ? hoverBg : 'rgba(255,255,255,0.06)',
                    boxShadow: isHovered
                      ? `0 0 24px ${glowColor}, 0 8px 28px rgba(0,0,0,0.3)`
                      : '0 2px 12px rgba(0,0,0,0.2)',
                    transform: isHovered ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    border: `1px solid ${isHovered ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                  }}
                  className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                    style={{
                      color: isHovered ? '#fff' : 'rgba(241,245,255,0.6)',
                      animation: isHovered ? 'contact-shake 0.5s ease' : 'none',
                    }}
                  />
                </div>

                <div className="text-center space-y-0.5">
                  <p
                    style={{ opacity: isHovered ? 1 : 0.35, transition: 'opacity 0.3s ease' }}
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60"
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      transform: isHovered ? 'translateY(2px)' : 'translateY(0)',
                      transition: 'transform 0.3s ease',
                      opacity: isHovered ? 1 : 0.45,
                    }}
                    className="text-[11px] font-semibold text-white/70 truncate max-w-[160px]"
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
