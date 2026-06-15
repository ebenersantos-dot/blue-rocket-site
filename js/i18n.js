/* i18n.js — Blue Rocket Co. language switcher
   Supports: en (English), pt (Portuguese BR), es (Spanish ES)
   Usage: add data-i18n="key" to any element.
   For placeholders: data-i18n-placeholder="key"
   For aria-labels:  data-i18n-aria="key"
*/

(function () {
  'use strict';

  var STORAGE_KEY = 'br_lang';

  var LANGS = {
    en: { flag: '🇬🇧', label: 'English' },
    pt: { flag: '🇧🇷', label: 'Português' },
    es: { flag: '🇪🇸', label: 'Español' }
  };

  var T = {
    /* ── Navigation ─────────────────────────────────────────────── */
    'nav.home':      { en: 'Home',    pt: 'Início',   es: 'Inicio' },
    'nav.services':  { en: 'Services',pt: 'Serviços', es: 'Servicios' },
    'nav.about':     { en: 'About',   pt: 'Sobre',    es: 'Nosotros' },
    'nav.process':   { en: 'Process', pt: 'Processo', es: 'Proceso' },
    'nav.contact':   { en: 'Contact', pt: 'Contacto', es: 'Contacto' },
    'nav.book':      { en: 'Book a call', pt: 'Agendar chamada', es: 'Reservar llamada' },

    /* ── Hero (index) ───────────────────────────────────────────── */
    'hero.tagline':  { en: 'Operations systems<br>for service businesses', pt: 'Sistemas de operações<br>para negócios de serviços', es: 'Sistemas de operaciones<br>para negocios de servicios' },
    'hero.subhead':  { en: 'From spreadsheets to Salesforce — we build what your business actually needs.', pt: 'Das planilhas ao Salesforce — construímos o que o seu negócio realmente precisa.', es: 'De las hojas de cálculo a Salesforce — construimos lo que tu negocio realmente necesita.' },
    'hero.cta':      { en: 'Book a free call', pt: 'Agendar chamada gratuita', es: 'Reservar llamada gratuita' },
    'hero.scroll':   { en: 'Scroll', pt: 'Rolar', es: 'Desplazar' },

    /* ── Problem section ────────────────────────────────────────── */
    'problem.eyebrow':   { en: 'The problem', pt: 'O problema', es: 'El problema' },
    'problem.headline1': { en: 'Most small businesses run on', pt: 'A maioria das pequenas empresas opera com', es: 'La mayoría de las pequeñas empresas funcionan con' },
    'problem.headline2': { en: 'WhatsApp, spreadsheets, and memory.', pt: 'WhatsApp, planilhas e memória.', es: 'WhatsApp, hojas de cálculo y memoria.' },
    'problem.c1.title':  { en: 'No system', pt: 'Sem sistema', es: 'Sin sistema' },
    'problem.c1.body':   { en: 'Customer info lives in notebooks and the owner\'s head. Nothing is searchable, shareable, or scalable.', pt: 'As informações dos clientes ficam em cadernos e na cabeça do dono. Nada é pesquisável, partilhável ou escalável.', es: 'La información de los clientes vive en libretas y en la cabeza del dueño. Nada es buscable, compartible ni escalable.' },
    'problem.c2.title':  { en: 'Time lost', pt: 'Tempo perdido', es: 'Tiempo perdido' },
    'problem.c2.body':   { en: 'Hours spent every week on manual follow-ups, chasing payments, and copy-pasting data between tools that don\'t talk to each other.', pt: 'Horas gastas toda semana em acompanhamentos manuais, cobranças e cópia de dados entre ferramentas que não se integram.', es: 'Horas gastadas cada semana en seguimientos manuales, persiguiendo pagos y copiando datos entre herramientas que no se comunican.' },
    'problem.c3.title':  { en: 'Missed revenue', pt: 'Receita perdida', es: 'Ingresos perdidos' },
    'problem.c3.body':   { en: 'Leads fall through the cracks. Quotes go unanswered. Growth stalls — not because of the market, but because the operation can\'t keep up.', pt: 'Leads caem no esquecimento. Propostas ficam sem resposta. O crescimento estagna — não por causa do mercado, mas porque a operação não acompanha.', es: 'Los leads se pierden. Los presupuestos quedan sin respuesta. El crecimiento se estanca — no por el mercado, sino porque la operación no puede seguir el ritmo.' },
    'problem.closing':   { en: 'The solution isn\'t always Salesforce. <em>It\'s the right system for where you are right now.</em>', pt: 'A solução nem sempre é o Salesforce. <em>É o sistema certo para onde você está agora.</em>', es: 'La solución no siempre es Salesforce. <em>Es el sistema adecuado para donde estás ahora.</em>' },

    /* ── What we do ─────────────────────────────────────────────── */
    'pillars.eyebrow':   { en: 'What we do', pt: 'O que fazemos', es: 'Lo que hacemos' },
    'pillars.headline1': { en: 'Three things,', pt: 'Três coisas,', es: 'Tres cosas,' },
    'pillars.headline2': { en: 'done properly.', pt: 'feitas corretamente.', es: 'bien hechas.' },
    'pillars.c1.title':  { en: 'CRM &amp; Pipeline', pt: 'CRM &amp; Pipeline', es: 'CRM &amp; Pipeline' },
    'pillars.c1.body':   { en: 'Your customer data, leads, and deals in one place. We configure the right CRM for your stage — matched to your team size, revenue, and growth trajectory.', pt: 'Seus dados de clientes, leads e negócios num só lugar. Configuramos o CRM certo para o seu estágio — adaptado ao tamanho da equipa, receita e trajetória de crescimento.', es: 'Tus datos de clientes, leads y negocios en un solo lugar. Configuramos el CRM adecuado para tu etapa — adaptado al tamaño de tu equipo, ingresos y trayectoria de crecimiento.' },
    'pillars.c2.title':  { en: 'Automation', pt: 'Automação', es: 'Automatización' },
    'pillars.c2.body':   { en: 'Repetitive tasks handled automatically. Invoicing reminders, follow-up sequences, data sync across tools — without you lifting a finger.', pt: 'Tarefas repetitivas tratadas automaticamente. Lembretes de faturação, sequências de acompanhamento, sincronização de dados — sem que você precise fazer nada.', es: 'Tareas repetitivas gestionadas automáticamente. Recordatorios de facturación, secuencias de seguimiento, sincronización de datos — sin que tengas que mover un dedo.' },
    'pillars.c3.title':  { en: 'Operations', pt: 'Operações', es: 'Operaciones' },
    'pillars.c3.body':   { en: 'End-to-end systems: team workflows, payment infrastructure, communication tools, and documented SOPs your team can actually follow.', pt: 'Sistemas de ponta a ponta: fluxos de trabalho, infraestrutura de pagamentos, ferramentas de comunicação e POPs documentados que sua equipa consegue seguir de verdade.', es: 'Sistemas de extremo a extremo: flujos de trabajo, infraestructura de pagos, herramientas de comunicación y POEs documentados que tu equipo puede seguir realmente.' },

    /* ── Services preview ───────────────────────────────────────── */
    'services.eyebrow':    { en: 'Services', pt: 'Serviços', es: 'Servicios' },
    'services.headline1':  { en: 'A tier for', pt: 'Um nível para', es: 'Un nivel para' },
    'services.headline2':  { en: 'every stage.', pt: 'cada etapa.', es: 'cada etapa.' },
    'services.note':       { en: 'All tiers include an optional monthly retainer — ongoing support as your business grows.', pt: 'Todos os níveis incluem um retainer mensal opcional — suporte contínuo à medida que o seu negócio cresce.', es: 'Todos los niveles incluyen un retainer mensual opcional — soporte continuo a medida que tu negocio crece.' },
    'services.viewall':    { en: 'View all services', pt: 'Ver todos os serviços', es: 'Ver todos los servicios' },
    'tier.starter.body':   { en: 'Foundations: contacts, pipeline, and the basics — organized.', pt: 'Bases: contactos, pipeline e o essencial — organizado.', es: 'Fundamentos: contactos, pipeline y lo básico — organizado.' },
    'tier.pro.body':       { en: 'Automation layered on top of a working pipeline.', pt: 'Automação adicionada a um pipeline funcional.', es: 'Automatización sobre un pipeline funcional.' },
    'tier.crm.body':       { en: 'A dedicated CRM, configured end to end for your team.', pt: 'Um CRM dedicado, configurado de ponta a ponta para a sua equipa.', es: 'Un CRM dedicado, configurado de extremo a extremo para tu equipo.' },
    'tier.sf.body':        { en: 'Full Salesforce implementation for established operations.', pt: 'Implementação completa do Salesforce para operações estabelecidas.', es: 'Implementación completa de Salesforce para operaciones establecidas.' },
    'tier.details':        { en: 'Details →', pt: 'Detalhes →', es: 'Detalles →' },

    /* ── Gallery ────────────────────────────────────────────────── */
    'gallery.eyebrow':   { en: 'The engagement', pt: 'O projeto', es: 'El proyecto' },
    'gallery.headline1': { en: 'From first call', pt: 'Da primeira chamada', es: 'Desde la primera llamada' },
    'gallery.headline2': { en: 'to running system.', pt: 'ao sistema em funcionamento.', es: 'al sistema en marcha.' },
    'gallery.hint':      { en: 'Drag or scroll →', pt: 'Arraste ou role →', es: 'Arrastra o desplaza →' },
    'gallery.g1.title':  { en: 'Discovery', pt: 'Descoberta', es: 'Descubrimiento' },
    'gallery.g1.sub':    { en: 'mapping the real bottleneck', pt: 'mapeando o gargalo real', es: 'identificando el cuello de botella real' },
    'gallery.g2.title':  { en: 'Diagnosis', pt: 'Diagnóstico', es: 'Diagnóstico' },
    'gallery.g2.sub':    { en: 'the right tier for your stage', pt: 'o nível certo para o seu estágio', es: 'el nivel adecuado para tu etapa' },
    'gallery.g3.title':  { en: 'Build', pt: 'Construção', es: 'Construcción' },
    'gallery.g3.sub':    { en: 'the system takes shape', pt: 'o sistema toma forma', es: 'el sistema toma forma' },
    'gallery.g4.title':  { en: 'Automation', pt: 'Automação', es: 'Automatización' },
    'gallery.g4.sub':    { en: 'it runs itself', pt: 'funciona sozinho', es: 'funciona solo' },
    'gallery.g5.title':  { en: 'Handover', pt: 'Entrega', es: 'Entrega' },
    'gallery.g5.sub':    { en: 'your business, your system', pt: 'o seu negócio, o seu sistema', es: 'tu negocio, tu sistema' },
    'gallery.g6.title':  { en: 'Support', pt: 'Suporte', es: 'Soporte' },
    'gallery.g6.sub':    { en: 'we\'re still here', pt: 'continuamos aqui', es: 'seguimos aquí' },

    /* ── Why us ─────────────────────────────────────────────────── */
    'why.eyebrow':    { en: 'Why us', pt: 'Por que nós', es: 'Por qué nosotros' },
    'why.headline1':  { en: 'Why', pt: 'Por que', es: 'Por qué' },
    'why.headline2':  { en: 'Blue Rocket Co.', pt: 'Blue Rocket Co.', es: 'Blue Rocket Co.' },
    'why.c1.title':   { en: 'Right-sized solutions', pt: 'Soluções ajustadas', es: 'Soluciones a medida' },
    'why.c1.body':    { en: 'We match the solution to your stage, not our commission. The right tool at the right moment — no more, no less.', pt: 'Adaptamos a solução ao seu estágio, não à nossa comissão. A ferramenta certa no momento certo — nem mais, nem menos.', es: 'Adaptamos la solución a tu etapa, no a nuestra comisión. La herramienta correcta en el momento correcto — ni más ni menos.' },
    'why.c2.title':   { en: 'Senior operator background', pt: 'Experiência de gestor sénior', es: 'Experiencia de operador senior' },
    'why.c2.body':    { en: '11+ years running operations across 3 countries. We\'ve been in your shoes — we know what actually breaks.', pt: 'Mais de 11 anos gerindo operações em 3 países. Já estivemos no seu lugar — sabemos o que realmente falha.', es: 'Más de 11 años gestionando operaciones en 3 países. Hemos estado en tu lugar — sabemos qué falla realmente.' },
    'why.c3.title':   { en: 'Multilingual', pt: 'Multilíngue', es: 'Multilingüe' },
    'why.c3.body':    { en: 'Native Portuguese, fluent English and Spanish. We work seamlessly across markets and teams.', pt: 'Português nativo, inglês e espanhol fluentes. Trabalhamos de forma fluida em diferentes mercados e equipas.', es: 'Portugués nativo, inglés y español fluidos. Trabajamos sin problemas en diferentes mercados y equipos.' },
    'why.c4.title':   { en: 'You own the outcome', pt: 'Você é dono do resultado', es: 'Tú eres dueño del resultado' },
    'why.c4.body':    { en: 'We build systems your team can run without us. No dependency, no lock-in. Documented, trained, handed over.', pt: 'Construímos sistemas que a sua equipa consegue operar sem nós. Sem dependência, sem lock-in. Documentado, treinado e entregue.', es: 'Construimos sistemas que tu equipo puede gestionar sin nosotros. Sin dependencia, sin lock-in. Documentado, formado y entregado.' },
    'why.c5.title':   { en: 'Grow with you', pt: 'Crescemos com você', es: 'Crecemos contigo' },
    'why.c5.body':    { en: 'Start at Starter tier, move to Salesforce when you\'re ready. One partner for every stage of your growth.', pt: 'Comece no nível Starter, migre para o Salesforce quando estiver pronto. Um parceiro para cada etapa do seu crescimento.', es: 'Empieza en el nivel Starter, pasa a Salesforce cuando estés listo. Un socio para cada etapa de tu crecimiento.' },
    'why.c6.title':   { en: 'Communication first', pt: 'Comunicação em primeiro lugar', es: 'Comunicación primero' },
    'why.c6.body':    { en: 'Weekly updates, clear timelines, one point of contact. No project management confusion.', pt: 'Atualizações semanais, prazos claros, um ponto de contacto. Sem confusão na gestão do projeto.', es: 'Actualizaciones semanales, plazos claros, un punto de contacto. Sin confusión en la gestión del proyecto.' },

    /* ── CTA strip ──────────────────────────────────────────────── */
    'cta.home':      { en: 'Ready to stop running on memory?', pt: 'Pronto para parar de operar na base da memória?', es: '¿Listo para dejar de funcionar solo con la memoria?' },
    'cta.home.btn':  { en: 'Book a free discovery call', pt: 'Agendar chamada de descoberta gratuita', es: 'Reservar llamada de descubrimiento gratuita' },

    /* ── Footer ─────────────────────────────────────────────────── */
    'footer.tagline': { en: 'Operations systems for service businesses', pt: 'Sistemas de operações para negócios de serviços', es: 'Sistemas de operaciones para negocios de servicios' },
    'footer.geo':     { en: 'Spain · Remote-first · Serving Europe, the Americas &amp; Australasia.', pt: 'Espanha · Remoto primeiro · A servir Europa, Américas &amp; Australásia.', es: 'España · Remoto primero · Sirviendo a Europa, las Américas y Australasia.' },
    'footer.copy':    { en: '© 2026 Blue Rocket Co. All rights reserved.', pt: '© 2026 Blue Rocket Co. Todos os direitos reservados.', es: '© 2026 Blue Rocket Co. Todos los derechos reservados.' },
    'footer.whatsapp':{ en: '· WhatsApp available', pt: '· WhatsApp disponível', es: '· WhatsApp disponible' },

    /* ── Modal ──────────────────────────────────────────────────── */
    'modal.title':      { en: 'Let\'s talk.', pt: 'Vamos conversar.', es: 'Hablemos.' },
    'modal.subhead':    { en: 'Free 30-minute call. No commitment. No sales pitch.', pt: 'Chamada gratuita de 30 minutos. Sem compromisso. Sem discurso de vendas.', es: 'Llamada gratuita de 30 minutos. Sin compromiso. Sin discurso de ventas.' },
    'modal.name':       { en: 'Name', pt: 'Nome', es: 'Nombre' },
    'modal.email':      { en: 'Email', pt: 'E-mail', es: 'Correo electrónico' },
    'modal.company':    { en: 'Company', pt: 'Empresa', es: 'Empresa' },
    'modal.phone':      { en: 'Phone number', pt: 'Número de telefone', es: 'Número de teléfono' },
    'modal.phone.opt':  { en: '(optional)', pt: '(opcional)', es: '(opcional)' },
    'modal.challenge':  { en: 'What\'s your biggest operational challenge right now?', pt: 'Qual é o seu maior desafio operacional neste momento?', es: '¿Cuál es tu mayor desafío operativo ahora mismo?' },
    'modal.submit':     { en: 'Submit', pt: 'Enviar', es: 'Enviar' },
    'modal.success':    { en: 'Thanks — we\'ll get back to you within one business day.', pt: 'Obrigado — entraremos em contacto dentro de um dia útil.', es: 'Gracias — nos pondremos en contacto en un día hábil.' },
    'modal.failure':    { en: 'Something went wrong sending your message. Please try again, or email us directly at contact@bluerocketcompany.com.', pt: 'Ocorreu um erro ao enviar a mensagem. Tente novamente ou contacte-nos diretamente em contact@bluerocketcompany.com.', es: 'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbenos a contact@bluerocketcompany.com.' },
    'modal.contact.email': { en: 'Email', pt: 'E-mail', es: 'Correo' },
    'modal.contact.wa':    { en: 'WhatsApp', pt: 'WhatsApp', es: 'WhatsApp' },
    'modal.contact.web':   { en: 'Website', pt: 'Site', es: 'Sitio web' },

    /* ── Services page ──────────────────────────────────────────── */
    'sp.eyebrow':       { en: 'Services', pt: 'Serviços', es: 'Servicios' },
    'sp.headline':      { en: 'The right tier for your stage.', pt: 'O nível certo para o seu estágio.', es: 'El nivel adecuado para tu etapa.' },
    'sp.lead':          { en: 'Matched to your team size and revenue. A system your team can run without us.', pt: 'Adaptado ao tamanho da sua equipa e receita. Um sistema que a sua equipa consegue operar sem nós.', es: 'Adaptado al tamaño de tu equipo e ingresos. Un sistema que tu equipo puede gestionar sin nosotros.' },
    'sp.t1.fit':        { en: '1–3 people · Pre-system · Under €300k revenue', pt: '1–3 pessoas · Pré-sistema · Menos de €300k de receita', es: '1–3 personas · Pre-sistema · Menos de €300k de ingresos' },
    'sp.t1.best':       { en: '<strong>Best for:</strong> solo operators and small teams still running on spreadsheets and chat. You need your contacts, leads, and follow-ups in one organized place — fast.', pt: '<strong>Ideal para:</strong> operadores individuais e pequenas equipas ainda a funcionar com planilhas e chat. Você precisa dos seus contactos, leads e acompanhamentos num lugar organizado — rápido.', es: '<strong>Ideal para:</strong> operadores individuales y equipos pequeños que aún funcionan con hojas de cálculo y chat. Necesitas tus contactos, leads y seguimientos en un lugar organizado — rápido.' },
    'sp.t1.li1':        { en: 'Contact and lead database built for your workflow', pt: 'Base de dados de contactos e leads adaptada ao seu fluxo de trabalho', es: 'Base de datos de contactos y leads adaptada a tu flujo de trabajo' },
    'sp.t1.li2':        { en: 'Simple sales pipeline with clear stages', pt: 'Pipeline de vendas simples com etapas claras', es: 'Pipeline de ventas sencillo con etapas claras' },
    'sp.t1.li3':        { en: 'Templates for quotes, follow-ups, and invoicing', pt: 'Modelos para propostas, acompanhamentos e faturação', es: 'Plantillas para presupuestos, seguimientos y facturación' },
    'sp.t1.li4':        { en: 'One training session and a written quick-start guide', pt: 'Uma sessão de formação e um guia de início rápido escrito', es: 'Una sesión de formación y una guía de inicio rápido escrita' },
    'sp.t2.fit':        { en: '3–10 people · Some tools, disconnected · €300k–1M revenue', pt: '3–10 pessoas · Algumas ferramentas, desconectadas · €300k–1M de receita', es: '3–10 personas · Algunas herramientas, desconectadas · €300k–1M de ingresos' },
    'sp.t2.best':       { en: '<strong>Best for:</strong> businesses with a working pipeline that lose hours every week to manual work. Time to make the repetitive tasks run themselves.', pt: '<strong>Ideal para:</strong> empresas com um pipeline funcional que perdem horas semanais em trabalho manual. É hora de fazer as tarefas repetitivas funcionarem sozinhas.', es: '<strong>Ideal para:</strong> empresas con un pipeline funcional que pierden horas cada semana en trabajo manual. Es hora de que las tareas repetitivas se gestionen solas.' },
    'sp.t2.li1':        { en: 'Everything in Starter, refined for your workflow', pt: 'Tudo do Starter, refinado para o seu fluxo de trabalho', es: 'Todo lo del Starter, refinado para tu flujo de trabajo' },
    'sp.t2.li2':        { en: 'Automated follow-up sequences and payment reminders', pt: 'Sequências de acompanhamento automatizadas e lembretes de pagamento', es: 'Secuencias de seguimiento automatizadas y recordatorios de pago' },
    'sp.t2.li3':        { en: 'Data sync across the tools you already use', pt: 'Sincronização de dados entre as ferramentas que já utiliza', es: 'Sincronización de datos entre las herramientas que ya usas' },
    'sp.t2.li4':        { en: 'Team training plus documented SOPs', pt: 'Formação da equipa e POPs documentados', es: 'Formación del equipo y POEs documentados' },
    'sp.t3.fit':        { en: '5–20 people · Growing fast · €500k–3M revenue', pt: '5–20 pessoas · Crescimento acelerado · €500k–3M de receita', es: '5–20 personas · Crecimiento rápido · €500k–3M de ingresos' },
    'sp.t3.best':       { en: '<strong>Best for:</strong> growing teams that have outgrown spreadsheets. You need a dedicated CRM configured around how your business actually sells and delivers.', pt: '<strong>Ideal para:</strong> equipas em crescimento que já superaram as planilhas. Você precisa de um CRM dedicado configurado em torno de como o seu negócio realmente vende e entrega.', es: '<strong>Ideal para:</strong> equipos en crecimiento que han superado las hojas de cálculo. Necesitas un CRM dedicado configurado en torno a cómo tu negocio realmente vende y entrega.' },
    'sp.t3.li1':        { en: 'Full CRM implementation, configured end to end', pt: 'Implementação completa de CRM, configurada de ponta a ponta', es: 'Implementación completa de CRM, configurada de extremo a extremo' },
    'sp.t3.li2':        { en: 'Data migration from your current tools', pt: 'Migração de dados das suas ferramentas atuais', es: 'Migración de datos de tus herramientas actuales' },
    'sp.t3.li3':        { en: 'Automation across sales, delivery, and invoicing', pt: 'Automação de vendas, entrega e faturação', es: 'Automatización en ventas, entrega y facturación' },
    'sp.t3.li4':        { en: 'Dashboards, team training, and full documentation', pt: 'Dashboards, formação da equipa e documentação completa', es: 'Dashboards, formación del equipo y documentación completa' },
    'sp.t4.fit':        { en: '10+ people · Complex operations · €1M+ revenue', pt: '10+ pessoas · Operações complexas · €1M+ de receita', es: '10+ personas · Operaciones complejas · €1M+ de ingresos' },
    'sp.t4.best':       { en: '<strong>Best for:</strong> established operations ready for the industry standard. Multiple teams, complex pipelines, and reporting that leadership can act on.', pt: '<strong>Ideal para:</strong> operações estabelecidas prontas para o padrão do setor. Múltiplas equipas, pipelines complexos e relatórios sobre os quais a liderança pode agir.', es: '<strong>Ideal para:</strong> operaciones establecidas listas para el estándar de la industria. Múltiples equipos, pipelines complejos e informes sobre los que el liderazgo puede actuar.' },
    'sp.t4.li1':        { en: 'Salesforce implementation scoped to your operation', pt: 'Implementação do Salesforce adaptada à sua operação', es: 'Implementación de Salesforce adaptada a tu operación' },
    'sp.t4.li2':        { en: 'Custom objects, flows, and automation', pt: 'Objetos personalizados, fluxos e automação', es: 'Objetos personalizados, flujos y automatización' },
    'sp.t4.li3':        { en: 'Data migration and integration with existing tools', pt: 'Migração de dados e integração com ferramentas existentes', es: 'Migración de datos e integración con herramientas existentes' },
    'sp.t4.li4':        { en: 'Admin handover, training, and documentation', pt: 'Entrega ao administrador, formação e documentação', es: 'Entrega al administrador, formación y documentación' },
    'sp.t.cta':         { en: 'Book a call to learn more →', pt: 'Agendar chamada para saber mais →', es: 'Reservar llamada para saber más →' },
    'sp.note':          { en: 'We select the tools that make the most sense for your business — balancing capability, cost-effectiveness, and long-term fit. Not every operation needs Salesforce, and we\'ll never recommend more than your stage requires. All tiers include an optional monthly retainer for ongoing support as your business grows.', pt: 'Selecionamos as ferramentas que fazem mais sentido para o seu negócio — equilibrando capacidade, custo-benefício e adequação a longo prazo. Nem todas as operações precisam do Salesforce, e nunca recomendaremos mais do que o seu estágio exige. Todos os níveis incluem um retainer mensal opcional para suporte contínuo.', es: 'Seleccionamos las herramientas que tienen más sentido para tu negocio — equilibrando capacidad, rentabilidad y adecuación a largo plazo. No todas las operaciones necesitan Salesforce, y nunca recomendaremos más de lo que tu etapa requiere. Todos los niveles incluyen un retainer mensual opcional para soporte continuo.' },
    'sp.cta.h':         { en: 'Not sure which tier fits?', pt: 'Não sabe qual nível se encaixa?', es: '¿No sabes qué nivel encaja?' },
    'sp.cta.btn':       { en: 'Get in touch', pt: 'Entrar em contacto', es: 'Ponte en contacto' },

    /* ── About page ─────────────────────────────────────────────── */
    'ab.eyebrow':    { en: 'About', pt: 'Sobre', es: 'Nosotros' },
    'ab.headline':   { en: 'Built by an operator, not a salesperson.', pt: 'Construído por um operador, não por um vendedor.', es: 'Construido por un operador, no por un vendedor.' },
    'ab.lead':       { en: 'The story behind the name, and the experience behind the work.', pt: 'A história por trás do nome e a experiência por trás do trabalho.', es: 'La historia detrás del nombre y la experiencia detrás del trabajo.' },
    'ab.s1.h':       { en: 'From Red Rocket to Blue Rocket', pt: 'Do Red Rocket ao Blue Rocket', es: 'Del Red Rocket al Blue Rocket' },
    'ab.s1.p1':      { en: 'The company started as Red Rocket — fast, loud, built for momentum. But the work we actually do isn\'t loud. It\'s deliberate: mapping how a business really runs, finding the bottleneck, and building the system that removes it.', pt: 'A empresa começou como Red Rocket — rápida, barulhenta, construída para o impulso. Mas o trabalho que realmente fazemos não é barulhento. É deliberado: mapear como um negócio realmente funciona, encontrar o gargalo e construir o sistema que o elimina.', es: 'La empresa empezó como Red Rocket — rápida, ruidosa, construida para el impulso. Pero el trabajo que realmente hacemos no es ruidoso. Es deliberado: mapear cómo funciona realmente un negocio, encontrar el cuello de botella y construir el sistema que lo elimina.' },
    'ab.s1.p2':      { en: 'Blue is the color of that work. Calm under pressure. Precise. Trustworthy. The rocket stayed, because the goal never changed — getting your operation off the ground and keeping it climbing. The name change wasn\'t a rebrand for its own sake. It was the company growing into what it had become.', pt: 'O azul é a cor desse trabalho. Calmo sob pressão. Preciso. Confiável. O foguete permaneceu, porque o objetivo nunca mudou — colocar a sua operação no ar e mantê-la em ascensão. A mudança de nome não foi um rebranding gratuito. Foi a empresa crescendo para o que se tornou.', es: 'El azul es el color de ese trabajo. Tranquilo bajo presión. Preciso. Confiable. El cohete se mantuvo, porque el objetivo nunca cambió — hacer despegar tu operación y mantenerla en ascenso. El cambio de nombre no fue un rebranding por sí mismo. Fue la empresa creciendo hacia lo que se había convertido.' },
    'ab.s2.h':       { en: 'Ebener Santos', pt: 'Ebener Santos', es: 'Ebener Santos' },
    'ab.s2.p1':      { en: '<strong>Founder and lead consultant.</strong> Ebener has spent more than 11 years running operations across three continents. For six of those years he served as General Manager of a multi-location service company, responsible for everything from sales pipeline to scheduling, payments, supplier relationships, and staff.', pt: '<strong>Fundador e consultor principal.</strong> Ebener passou mais de 11 anos gerindo operações em três continentes. Durante seis desses anos, atuou como Diretor Geral de uma empresa de serviços com múltiplas unidades, responsável por tudo, desde o pipeline de vendas até ao agendamento, pagamentos, relações com fornecedores e equipas.', es: '<strong>Fundador y consultor principal.</strong> Ebener ha pasado más de 11 años gestionando operaciones en tres continentes. Durante seis de esos años fue Director General de una empresa de servicios con múltiples ubicaciones, responsable de todo, desde el pipeline de ventas hasta la programación, pagos, relaciones con proveedores y personal.' },
    'ab.s2.p2':      { en: 'That matters because he has lived the problems he now solves — the lost lead, the invoice nobody chased, the Saturday spent rebuilding a spreadsheet that broke on Tuesday. He builds systems the way an operator builds them: for the people who have to use them every day.', pt: 'Isso importa porque ele viveu os problemas que agora resolve — o lead perdido, a fatura que ninguém cobrou, o sábado gasto a reconstruir uma planilha que quebrou na terça-feira. Ele constrói sistemas como um operador os constrói: para as pessoas que precisam usá-los todos os dias.', es: 'Eso importa porque ha vivido los problemas que ahora resuelve — el lead perdido, la factura que nadie cobró, el sábado reconstruyendo una hoja de cálculo que se rompió el martes. Construye sistemas como lo haría un operador: para las personas que tienen que usarlos cada día.' },
    'ab.s2.p3':      { en: 'He personally oversees every engagement from scoping through delivery, ensuring each solution meets the quality standards we hold ourselves to before anything is handed over to the client.', pt: 'Ele supervisiona pessoalmente cada projeto, desde o âmbito até à entrega, garantindo que cada solução cumpre os padrões de qualidade que exigimos de nós mesmos antes de qualquer coisa ser entregue ao cliente.', es: 'Supervisa personalmente cada proyecto desde el alcance hasta la entrega, asegurando que cada solución cumpla los estándares de calidad que nos exigimos antes de entregar nada al cliente.' },
    'ab.s2.p4':      { en: 'He works natively in Portuguese and fluently in English and Spanish, and is currently completing his Salesforce Administrator certification.', pt: 'Trabalha nativamente em português e com fluência em inglês e espanhol, e está atualmente a concluir a sua certificação de Administrador Salesforce.', es: 'Trabaja nativamente en portugués y con fluidez en inglés y español, y actualmente está completando su certificación de Administrador de Salesforce.' },
    'ab.s3.h':       { en: 'The philosophy', pt: 'A filosofia', es: 'La filosofía' },
    'ab.s3.p1':      { en: '<strong>Right-sized solutions.</strong> The right system for where you are right now — a lean, cost-effective setup when that\'s enough, Salesforce when it isn\'t. We match the solution to your stage, not our commission.', pt: '<strong>Soluções ajustadas.</strong> O sistema certo para onde você está agora — uma configuração enxuta e eficiente em custo quando isso basta, Salesforce quando não basta. Adaptamos a solução ao seu estágio, não à nossa comissão.', es: '<strong>Soluciones a medida.</strong> El sistema adecuado para donde estás ahora — una configuración ágil y rentable cuando eso es suficiente, Salesforce cuando no lo es. Adaptamos la solución a tu etapa, no a nuestra comisión.' },
    'ab.s3.p2':      { en: '<strong>You own the outcome.</strong> Every engagement ends with documentation, training, and a full handover. Your team runs the system without us. No dependency, no lock-in.', pt: '<strong>Você é dono do resultado.</strong> Cada projeto termina com documentação, formação e uma entrega completa. A sua equipa opera o sistema sem nós. Sem dependência, sem lock-in.', es: '<strong>Tú eres dueño del resultado.</strong> Cada proyecto termina con documentación, formación y una entrega completa. Tu equipo gestiona el sistema sin nosotros. Sin dependencia, sin lock-in.' },
    'ab.s3.p3':      { en: '<strong>We meet you where you are.</strong> No judgment about the threads and notebooks that keep most service businesses running. That\'s where most operations start. The point is where you go from there.', pt: '<strong>Encontramos você onde está.</strong> Sem julgamentos sobre os grupos e cadernos que mantêm a maioria dos negócios de serviços a funcionar. É aí que a maioria das operações começa. O ponto é para onde você vai a partir daí.', es: '<strong>Te encontramos donde estás.</strong> Sin juicios sobre los grupos y libretas que mantienen a la mayoría de los negocios de servicios funcionando. Ahí es donde empieza la mayoría de las operaciones. Lo importante es a dónde vas desde ahí.' },
    'ab.cta.h':      { en: 'Let\'s talk about your operation.', pt: 'Vamos falar sobre a sua operação.', es: 'Hablemos de tu operación.' },
    'ab.cta.btn':    { en: 'Get in touch', pt: 'Entrar em contacto', es: 'Ponte en contacto' },

    /* ── Process page ───────────────────────────────────────────── */
    'pr.eyebrow':    { en: 'Process', pt: 'Processo', es: 'Proceso' },
    'pr.headline':   { en: 'How it works.', pt: 'Como funciona.', es: 'Cómo funciona.' },
    'pr.lead':       { en: 'Four steps. Fixed price. No surprises along the way.', pt: 'Quatro etapas. Preço fixo. Sem surpresas no caminho.', es: 'Cuatro pasos. Precio fijo. Sin sorpresas en el camino.' },
    'pr.s1.kicker':  { en: 'Free · 30 minutes', pt: 'Gratuito · 30 minutos', es: 'Gratuito · 30 minutos' },
    'pr.s1.h':       { en: 'Discovery call', pt: 'Chamada de descoberta', es: 'Llamada de descubrimiento' },
    'pr.s1.p':       { en: 'Every engagement starts with a free 30-minute call. No commitment, no sales pitch. We ask about your business: how leads come in, how work gets delivered, where the hours disappear, and what keeps falling through the cracks. By the end of the call you\'ll know whether we can help — and so will we.', pt: 'Cada projeto começa com uma chamada gratuita de 30 minutos. Sem compromisso, sem discurso de vendas. Perguntamos sobre o seu negócio: como os leads chegam, como o trabalho é entregue, onde as horas desaparecem e o que continua a cair pelas fendas. No final da chamada, saberá se podemos ajudar — e nós também.', es: 'Cada proyecto empieza con una llamada gratuita de 30 minutos. Sin compromiso, sin discurso de ventas. Preguntamos sobre tu negocio: cómo llegan los leads, cómo se entrega el trabajo, dónde desaparecen las horas y qué sigue cayendo por las grietas. Al final de la llamada sabrás si podemos ayudarte — y nosotros también.' },
    'pr.s2.kicker':  { en: 'Within one week', pt: 'Dentro de uma semana', es: 'En una semana' },
    'pr.s2.h':       { en: 'Diagnosis &amp; proposal', pt: 'Diagnóstico &amp; proposta', es: 'Diagnóstico &amp; propuesta' },
    'pr.s2.p':       { en: 'We map your current operation end to end — every tool, every handoff, every workaround. Then we propose the tier that fits your stage, with a fixed price and a clear timeline. You\'ll see exactly what gets built, what it costs, and when it\'s done. No open-ended billing, no scope creep.', pt: 'Mapeamos a sua operação atual de ponta a ponta — cada ferramenta, cada entrega, cada solução alternativa. Em seguida, propomos o nível que se adequa ao seu estágio, com um preço fixo e um prazo claro. Verá exatamente o que é construído, o que custa e quando estará pronto. Sem faturação em aberto, sem derrapagem de âmbito.', es: 'Mapeamos tu operación actual de extremo a extremo — cada herramienta, cada entrega, cada solución alternativa. Luego proponemos el nivel que se adapta a tu etapa, con un precio fijo y un plazo claro. Verás exactamente qué se construye, cuánto cuesta y cuándo estará listo. Sin facturación abierta, sin desvíos de alcance.' },
    'pr.s3.kicker':  { en: '2–6 weeks depending on tier', pt: '2–6 semanas dependendo do nível', es: '2–6 semanas según el nivel' },
    'pr.s3.h':       { en: 'Build &amp; implement', pt: 'Construção &amp; implementação', es: 'Construcción &amp; implementación' },
    'pr.s3.p':       { en: 'We configure your system, migrate your data, and set up the automation. Your existing records — contacts, deals, history — move over cleanly. You get weekly updates and one point of contact throughout. Your business keeps running while we build; nothing switches over until it works.', pt: 'Configuramos o seu sistema, migramos os seus dados e configuramos a automação. Os seus registos existentes — contactos, negócios, histórico — são transferidos de forma limpa. Recebe atualizações semanais e um único ponto de contacto durante todo o processo. O seu negócio continua a funcionar enquanto construímos; nada muda até que funcione.', es: 'Configuramos tu sistema, migramos tus datos y configuramos la automatización. Tus registros existentes — contactos, negocios, historial — se transfieren limpiamente. Recibes actualizaciones semanales y un único punto de contacto durante todo el proceso. Tu negocio sigue funcionando mientras construimos; nada cambia hasta que funcione.' },
    'pr.s4.kicker':  { en: 'You own it from day one', pt: 'É seu desde o primeiro dia', es: 'Es tuyo desde el primer día' },
    'pr.s4.h':       { en: 'Train &amp; handover', pt: 'Formação &amp; entrega', es: 'Formación &amp; entrega' },
    'pr.s4.p':       { en: 'We train your team on the live system, hand over complete documentation, and transfer every account and credential to you. You own it — no dependency on us. If you want ongoing support, the optional retainer covers adjustments and new automation as you grow. If not, you\'re fully equipped to run it yourself.', pt: 'Treinamos a sua equipa no sistema ativo, entregamos documentação completa e transferimos todas as contas e credenciais para você. É seu — sem dependência de nós. Se quiser suporte contínuo, o retainer opcional cobre ajustes e nova automação à medida que cresce. Se não, está totalmente equipado para geri-lo por conta própria.', es: 'Formamos a tu equipo en el sistema en vivo, entregamos documentación completa y te transferimos todas las cuentas y credenciales. Es tuyo — sin dependencia de nosotros. Si quieres soporte continuo, el retainer opcional cubre ajustes y nueva automatización a medida que creces. Si no, estás totalmente equipado para gestionarlo tú mismo.' },
    'pr.cta.h':      { en: 'Step one is free.', pt: 'O primeiro passo é gratuito.', es: 'El primer paso es gratuito.' },
    'pr.cta.btn':    { en: 'Book a free discovery call', pt: 'Agendar chamada de descoberta gratuita', es: 'Reservar llamada de descubrimiento gratuita' },

    /* ── Contact page ───────────────────────────────────────────── */
    'ct.eyebrow':    { en: 'Contact', pt: 'Contacto', es: 'Contacto' },
    'ct.headline':   { en: 'Get in touch.', pt: 'Entre em contacto.', es: 'Ponte en contacto.' },
    'ct.lead':       { en: 'Every engagement starts with a free 30-minute discovery call. No commitment. We\'ll ask about your business, your biggest pain points, and where you want to be in 12 months.', pt: 'Cada projeto começa com uma chamada de descoberta gratuita de 30 minutos. Sem compromisso. Perguntaremos sobre o seu negócio, os seus maiores pontos problemáticos e onde quer estar em 12 meses.', es: 'Cada proyecto empieza con una llamada de descubrimiento gratuita de 30 minutos. Sin compromiso. Preguntaremos sobre tu negocio, tus mayores puntos de dolor y dónde quieres estar en 12 meses.' },
    'ct.card.email': { en: 'Email', pt: 'E-mail', es: 'Correo' },
    'ct.card.phone': { en: 'Phone / WhatsApp', pt: 'Telefone / WhatsApp', es: 'Teléfono / WhatsApp' },
    'ct.card.wa':    { en: 'WhatsApp available', pt: 'WhatsApp disponível', es: 'WhatsApp disponible' },
    'ct.card.web':   { en: 'Website', pt: 'Site', es: 'Sitio web' },
    'ct.form.h1':    { en: 'Tell us about', pt: 'Fale-nos sobre', es: 'Cuéntanos sobre' },
    'ct.form.h2':    { en: 'your operation.', pt: 'a sua operação.', es: 'tu operación.' },
    'ct.name':       { en: 'Name', pt: 'Nome', es: 'Nombre' },
    'ct.email':      { en: 'Email', pt: 'E-mail', es: 'Correo electrónico' },
    'ct.company':    { en: 'Company', pt: 'Empresa', es: 'Empresa' },
    'ct.phone':      { en: 'Phone number', pt: 'Número de telefone', es: 'Número de teléfono' },
    'ct.phone.opt':  { en: '(optional)', pt: '(opcional)', es: '(opcional)' },
    'ct.challenge':  { en: 'What\'s your biggest operational challenge right now?', pt: 'Qual é o seu maior desafio operacional neste momento?', es: '¿Cuál es tu mayor desafío operativo ahora mismo?' },
    'ct.submit':     { en: 'Submit', pt: 'Enviar', es: 'Enviar' },
    'ct.success':    { en: 'Thanks — we\'ll get back to you within one business day.', pt: 'Obrigado — entraremos em contacto dentro de um dia útil.', es: 'Gracias — nos pondremos en contacto en un día hábil.' },
    'ct.failure':    { en: 'Something went wrong sending your message. Please try again, or email us directly at contact@bluerocketcompany.com.', pt: 'Ocorreu um erro ao enviar a mensagem. Tente novamente ou contacte-nos diretamente em contact@bluerocketcompany.com.', es: 'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbenos a contact@bluerocketcompany.com.' }
  };

  /* ── Detect language ───────────────────────────────────────────── */
  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && T['nav.home'][stored]) return stored;
    var browser = (navigator.language || 'en').toLowerCase();
    if (browser.startsWith('pt')) return 'pt';
    if (browser.startsWith('es')) return 'es';
    return 'en';
  }

  var currentLang = detectLang();

  /* ── Apply translations to DOM ─────────────────────────────────── */
  function applyLang(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key] && T[key][lang] !== undefined) {
        el.innerHTML = T[key][lang];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (T[key] && T[key][lang] !== undefined) {
        el.placeholder = T[key][lang];
      }
    });

    /* Update switcher active state */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  /* ── Build switcher UI ─────────────────────────────────────────── */
  function buildSwitcher() {
    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Language');

    Object.keys(LANGS).forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-btn';
      btn.dataset.lang = code;
      btn.setAttribute('aria-pressed', String(code === currentLang));
      btn.innerHTML = '<span class="lang-flag" aria-hidden="true">' + LANGS[code].flag + '</span>';
      btn.addEventListener('click', function () {
        currentLang = code;
        localStorage.setItem(STORAGE_KEY, code);
        applyLang(code);
      });
      switcher.appendChild(btn);
    });

    /* Insert before the hamburger button */
    var hamburger = document.querySelector('[data-hamburger]');
    if (hamburger) {
      hamburger.parentNode.insertBefore(switcher, hamburger);
    }
  }

  /* ── Init ──────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    buildSwitcher();
    applyLang(currentLang);
  });

})();
