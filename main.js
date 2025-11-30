const storageKeys = {
  index: 'quiz_current_index',
  score: 'quiz_score',
  answered: 'quiz_answered',
};

/**
 * Question model reference
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {string} prompt
 * @property {{ id: string, label: string }[]} choices
 * @property {string} correctChoiceId
 * @property {string} explanation
 */

/**
 * Placeholder loader for JSON-based question files.
 * Replace with fetch('/path/to/questions.json').then(res => res.json()).
 * @returns {Promise<QuizQuestion[]>}
 */
function loadQuestions() {
  const sampleQuestions = [
    {
      id: 'q1',
      prompt:
        'Under the omission rules in your outline, which situation most clearly creates a legal duty to act such that failure to act can be the actus reus of a crime?',
      choices: [
        { id: 'a', label: 'You see a stranger drowning at a public beach and decide not to help.' },
        {
          id: 'b',
          label:
            'You agree to care for your elderly neighbor and move her into your home, then ignore her medical needs and refuse to let others in to assist.',
        },
        { id: 'c', label: 'You walk past a car accident and call 911 but do not render aid.' },
        { id: 'd', label: 'You sell someone a defective ladder that later breaks and injures them.' },
      ],
      correctChoiceId: 'b',
      explanation: 'A voluntary assumption of care that excludes others creates a legal duty, making omission actionable.',
    },
    {
      id: 'q2',
      prompt: 'Which of the following best explains why “creation of the peril” is bracketed in the omissions list in your notes?',
      choices: [
        { id: 'a', label: 'It is never recognized as a valid source of a duty in American jurisdictions.' },
        { id: 'b', label: 'It is recognized only in common law jurisdictions, not in MPC jurisdictions.' },
        {
          id: 'c',
          label: 'Some jurisdictions accept it as creating a duty to act, while others do not, so it is less universally accepted than the other four duty categories.',
        },
        { id: 'd', label: 'It is redundant of the “status relationship” category and therefore generally ignored.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Creation of peril is inconsistently recognized, so it is bracketed as a less-settled duty source.',
    },
    {
      id: 'q3',
      prompt: 'Under the MPC definition of involuntary acts, which of the following is most clearly an involuntary act?',
      choices: [
        { id: 'a', label: 'A person who chooses to drive after drinking and falls asleep at the wheel.' },
        { id: 'b', label: 'A person whose arm reflexively jerks while being unexpectedly shocked, striking another.' },
        { id: 'c', label: 'A person who drinks voluntarily and then assaults another while drunk.' },
        { id: 'd', label: 'A person who drives while texting and hits a pedestrian.' },
      ],
      correctChoiceId: 'b',
      explanation: 'A reflexive movement after an unexpected shock fits the MPC list of involuntary acts.',
    },
    {
      id: 'q4',
      prompt: 'In Martin v. State, why was the conviction reversed under the voluntariness requirement?',
      choices: [
        { id: 'a', label: 'Because the defendant was unconscious when arrested.' },
        { id: 'b', label: 'Because the statute required proof of specific intent to be drunk.' },
        {
          id: 'c',
          label: 'Because the defendant was involuntarily brought onto the public highway by the police, so the “being on the highway” element was not voluntary.',
        },
        { id: 'd', label: 'Because the statute was deemed void for vagueness.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Police compelled presence on the highway, so the act element was not voluntary.',
    },
    {
      id: 'q5',
      prompt: 'Which scenario most clearly violates the legality principle as described in your notes?',
      choices: [
        {
          id: 'a',
          label: 'Prosecuting someone for a common law crime that is “inherently offensive to public morals” even though no statute defines it.',
        },
        {
          id: 'b',
          label: 'Prosecuting someone for violating a statute that is ambiguous, but related case law clarifies its meaning.',
        },
        { id: 'c', label: 'Prosecuting someone for conduct clearly described in a criminal statute that was enacted after the conduct occurred.' },
        { id: 'd', label: 'Both A and C.' },
      ],
      correctChoiceId: 'd',
      explanation: 'Both common law crime without statute and retroactive application offend legality and fair notice.',
    },
    {
      id: 'q6',
      prompt: 'Which is the primary justification for the modern legality principle NOT emphasized in the traditional “common law crime” approach?',
      choices: [
        { id: 'a', label: 'Individual autonomy' },
        { id: 'b', label: 'Fair notice and separation of powers' },
        { id: 'c', label: 'Efficient law enforcement' },
        { id: 'd', label: 'Proportionality of punishment' },
      ],
      correctChoiceId: 'b',
      explanation: 'Modern legality highlights fair notice and legislative primacy over judicial crime creation.',
    },
    {
      id: 'q7',
      prompt:
        'A vagrancy statute punishes “all persons of ill repute who cannot give a good account of themselves.” A challenge arguing that this statute is “void for vagueness” is most likely to succeed based on which concern?',
      choices: [
        { id: 'a', label: 'It criminalizes mere thoughts rather than acts.' },
        { id: 'b', label: 'It fails to give fair notice and invites arbitrary enforcement because of its lack of specificity.' },
        { id: 'c', label: 'It punishes omissions only.' },
        { id: 'd', label: 'It mandates strict liability for a serious felony.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The vague terms give no clear standard and enable arbitrary enforcement, violating due process.',
    },
    {
      id: 'q8',
      prompt:
        'Under the MPC “distributive default rule,” if a statute reads, “A person is guilty if he knowingly sells, delivers, or transports a controlled substance,” which is presumed?',
      choices: [
        { id: 'a', label: '“Knowingly” applies only to “sells.”' },
        { id: 'b', label: '“Knowingly” applies to “sells” and “delivers,” but not “transports.”' },
        { id: 'c', label: '“Knowingly” applies to all three verbs unless a contrary purpose plainly appears.' },
        { id: 'd', label: '“Knowingly” is read out because the statute is too ambiguous.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The MPC distributes the stated mens rea to each material element absent contrary intent.',
    },
    {
      id: 'q9',
      prompt:
        'Under the MPC “recklessness default rule,” when a statute defining an offense does not specify mens rea for a material element, the prosecution can satisfy the mental element by proving that the defendant acted:',
      choices: [
        { id: 'a', label: 'Purposely only.' },
        { id: 'b', label: 'Purposely or knowingly only.' },
        { id: 'c', label: 'Recklessly or negligently.' },
        { id: 'd', label: 'Purposely, knowingly, or recklessly.' },
      ],
      correctChoiceId: 'd',
      explanation: 'Recklessness is the default minimum, so purpose or knowledge also suffice.',
    },
    {
      id: 'q10',
      prompt: 'Which of the following best captures the difference between “pure” and “impure” strict liability as used in your notes?',
      choices: [
        { id: 'a', label: 'Pure involves statutory rape; impure involves public welfare offenses.' },
        {
          id: 'b',
          label: 'Pure has no mens rea for any material element; impure has at least one material element with a mens rea requirement and at least one treated as strict liability.',
        },
        { id: 'c', label: 'Pure applies only to felonies; impure only to misdemeanors.' },
        { id: 'd', label: 'Pure is allowed under the MPC for any crime; impure is prohibited.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Pure strict liability removes mens rea from all elements, while impure mixes strict and mental elements.',
    },
    {
      id: 'q11',
      prompt: 'Which of the following is most consistent with the modern federal approach to “public welfare offenses” in your materials?',
      choices: [
        { id: 'a', label: 'Mens rea is always strictly read out because public safety is paramount.' },
        { id: 'b', label: 'Courts generally read in at least purpose or knowledge to separate wrongful from innocent conduct.' },
        { id: 'c', label: 'Courts presume negligence is enough for all public welfare offenses.' },
        { id: 'd', label: 'Public welfare offenses are presumed unconstitutional under the Due Process Clause.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Modern federal cases often imply knowledge or purpose to avoid criminalizing innocent conduct.',
    },
    {
      id: 'q12',
      prompt:
        'Under the common law homicide scheme in your notes, which scenario most clearly supports first-degree murder based on premeditation and deliberation?',
      choices: [
        { id: 'a', label: 'A man impulsively shoots someone who insults him in a bar.' },
        {
          id: 'b',
          label: 'A man buys a gun a week earlier, lies in wait outside the victim’s house, and calmly shoots the victim when he appears.',
        },
        { id: 'c', label: 'A driver speeds through a red light and kills a pedestrian.' },
        { id: 'd', label: 'A man fires randomly into the air on New Year’s Eve, killing someone blocks away.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Planning, lying in wait, and calm execution show premeditation and deliberation for first-degree murder.',
    },
    {
      id: 'q13',
      prompt: 'The “depraved heart” murder description in your outline requires which combination of features?',
      choices: [
        { id: 'a', label: 'Recklessness only.' },
        { id: 'b', label: 'Extreme recklessness plus a base antisocial motive and a high probability of death.' },
        { id: 'c', label: 'Negligence plus foreseeability.' },
        { id: 'd', label: 'Malice plus premeditation and deliberation.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Depraved heart requires extreme recklessness with malignant indifference to a high risk of death.',
    },
    {
      id: 'q14',
      prompt:
        'Under traditional voluntary manslaughter (“heat of passion”/provocation), which of the following is least likely to qualify as adequate provocation under the categorical approach?',
      choices: [
        { id: 'a', label: 'Catching one’s spouse in the act of adultery.' },
        { id: 'b', label: 'A violent physical assault on the defendant.' },
        { id: 'c', label: 'Being informed hours earlier by a friend that the victim insulted the defendant’s business reputation.' },
        { id: 'd', label: 'Seeing someone break into the defendant’s home at night.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Mere words about insults, especially after time passes, typically are inadequate provocation.',
    },
    {
      id: 'q15',
      prompt: 'Under the modern provocation approach in your notes, which statement is most accurate?',
      choices: [
        { id: 'a', label: 'Only specific, historically recognized categories of provocation may be considered.' },
        {
          id: 'b',
          label: 'The question is whether a reasonable person in the defendant’s circumstances would have been provoked and would not have cooled off.',
        },
        { id: 'c', label: 'Cooling time is fixed by statute.' },
        { id: 'd', label: 'Cumulative provocation is irrelevant.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Modern tests use a reasonable person standard with the defendant’s circumstances and consider cooling time contextually.',
    },
    {
      id: 'q16',
      prompt: 'Under your outline’s description, “involuntary manslaughter” in traditional jurisdictions is most often based on:',
      choices: [
        { id: 'a', label: 'Purpose or knowledge.' },
        { id: 'b', label: 'Recklessness only.' },
        { id: 'c', label: 'Criminal (gross) negligence, though some states use ordinary negligence.' },
        { id: 'd', label: 'Strict liability.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Traditional involuntary manslaughter typically rests on criminal negligence and, in some places, ordinary negligence.',
    },
    {
      id: 'q17',
      prompt: 'According to the MPC scheme in your notes, which is true about homicide?',
      choices: [
        { id: 'a', label: 'MPC retains the term “involuntary manslaughter.”' },
        { id: 'b', label: 'MPC treats felony murder as a subset of depraved heart murder.' },
        { id: 'c', label: 'MPC has no negligent homicide offense.' },
        { id: 'd', label: 'MPC equates heat-of-passion manslaughter with second-degree murder.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC lists felony murder as a presumption of extreme indifference murder, akin to depraved heart.',
    },
    {
      id: 'q18',
      prompt: 'Under the MPC, “Extreme Emotional Disturbance” (EED) differs from common law provocation primarily because:',
      choices: [
        { id: 'a', label: 'It requires an objective reasonable person test only.' },
        {
          id: 'b',
          label: 'It allows consideration of the actor’s situation (including some personal handicaps) and cumulative provocation, and does not require traditional “categories.”',
        },
        { id: 'c', label: 'It requires a “natural force” trigger.' },
        { id: 'd', label: 'It requires that the defendant actually kill more than one person.' },
      ],
      correctChoiceId: 'b',
      explanation: 'EED is broader, considering the actor’s situation and cumulative stressors without rigid categories.',
    },
    {
      id: 'q19',
      prompt: 'Which of the following is most accurate regarding vehicular manslaughter in your materials?',
      choices: [
        { id: 'a', label: 'At common law it was always a strict liability offense.' },
        {
          id: 'b',
          label: 'Under modern statutory approaches described, it typically uses an ordinary negligence standard – a material deviation from the reasonable person’s standard.',
        },
        { id: 'c', label: 'The MPC treats all vehicular killings as murder.' },
        { id: 'd', label: 'The MPC rejects negligent homicide for vehicular killings.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Modern vehicular manslaughter statutes usually hinge on ordinary negligence or a material deviation from reasonable driving.',
    },
    {
      id: 'q20',
      prompt: 'Under the property crimes section, which statement about claim of right is correct?',
      choices: [
        { id: 'a', label: 'It is never a defense to larceny or robbery.' },
        { id: 'b', label: 'It is a defense to both larceny and robbery whenever the claim is reasonable.' },
        {
          id: 'c',
          label: 'It is a defense to larceny even if the belief is mistaken, so long as it is genuine, but not a defense to robbery when cash/fungible items are taken to satisfy a debt.',
        },
        { id: 'd', label: 'It is recognized only in MPC jurisdictions.' },
      ],
      correctChoiceId: 'c',
      explanation: 'A sincere claim negates larceny intent, but taking cash by force for a debt is still robbery.',
    },
    {
      id: 'q21',
      prompt: 'The key distinction between false pretenses and larceny by trick in your outline is:',
      choices: [
        { id: 'a', label: 'Whether the defendant uses a written versus oral misrepresentation.' },
        { id: 'b', label: 'Whether the victim passes title (false pretenses) or only possession/custody (larceny by trick).' },
        { id: 'c', label: 'Whether the property is real property or personal property.' },
        { id: 'd', label: 'Whether the victim is a merchant.' },
      ],
      correctChoiceId: 'b',
      explanation: 'False pretenses involves obtaining title through deceit, while larceny by trick obtains mere possession.',
    },
    {
      id: 'q22',
      prompt: 'Under your notes, which of the following most clearly constitutes embezzlement rather than larceny?',
      choices: [
        { id: 'a', label: 'A shoplifter conceals jeans in a backpack and walks out of a store.' },
        { id: 'b', label: 'A visitor steals jewelry from a host’s bedroom.' },
        {
          id: 'c',
          label: 'A bank teller, who lawfully possesses the cash drawer as part of her job, secretly transfers funds into her own account.',
        },
        { id: 'd', label: 'A person obtains money from a stranger by lying about a fake charity and walks away with the cash.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Embezzlement covers conversion by one already in lawful possession, like a teller diverting funds.',
    },
    {
      id: 'q23',
      prompt: 'Under the modern definition of burglary in your outline, which element is no longer required compared to the common law definition?',
      choices: [
        { id: 'a', label: 'Entering.' },
        { id: 'b', label: 'As a trespasser.' },
        { id: 'c', label: 'Intent to commit a felony therein.' },
        { id: 'd', label: 'Breaking and nighttime.' },
      ],
      correctChoiceId: 'd',
      explanation: 'Modern burglary statutes typically drop the “breaking” and “nighttime” requirements.',
    },
    {
      id: 'q24',
      prompt: 'A man picks a woman’s pocket on a crowded subway without her noticing. According to your materials, this is:',
      choices: [
        { id: 'a', label: 'Robbery, because the victim’s person was touched.' },
        { id: 'b', label: 'Robbery, because it occurred in public.' },
        { id: 'c', label: 'Larceny, because there was no force or fear used; the victim was unaware.' },
        { id: 'd', label: 'Burglary, because it occurred in an enclosed space.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Without force or intimidation, surreptitious taking from the person is larceny, not robbery.',
    },
    {
      id: 'q25',
      prompt: 'Under the attempt section, which statement best describes the MPC’s approach to grading attempt?',
      choices: [
        { id: 'a', label: 'Attempt is always punished as a misdemeanor regardless of the object crime.' },
        { id: 'b', label: 'Attempt is graded one degree lower than the object crime.' },
        {
          id: 'c',
          label: 'Attempt is generally punished the same as the object crime, except attempt to commit first-degree murder is punished as second-degree murder.',
        },
        { id: 'd', label: 'Attempt is always punished more severely than the completed crime to deter attempts.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The MPC aligns attempt with the target offense, with a carveout lowering first-degree murder attempts.',
    },
    {
      id: 'q26',
      prompt: 'Under the majority common law approach to attempt mens rea in your notes, which is required?',
      choices: [
        { id: 'a', label: 'Only that the defendant negligently risked causing the result.' },
        { id: 'b', label: 'That the defendant specifically intended the conduct but not necessarily the result.' },
        {
          id: 'c',
          label: 'That the defendant has specific intent as to conduct and result elements; circumstance elements usually take the underlying offense’s mens rea.',
        },
        { id: 'd', label: 'That the defendant act with malice toward the victim.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Attempt generally demands intent to bring about the result and to engage in the conduct, with circumstances following the target crime standard.',
    },
    {
      id: 'q27',
      prompt: 'Under the MPC’s approach to attempt mens rea in your outline:',
      choices: [
        { id: 'a', label: 'Attempt requires recklessness as to conduct and result.' },
        { id: 'b', label: 'Attempt requires purpose as to conduct and purpose or belief (knowledge) as to result elements.' },
        { id: 'c', label: 'Attempt requires negligence for all elements.' },
        { id: 'd', label: 'Attempt cannot apply to crimes with result elements.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC demands purposeful action and purpose or belief regarding the result for attempt liability.',
    },
    {
      id: 'q28',
      prompt: 'Which of the following tests for the actus reus of attempt is explicitly associated with the MPC and adopted by the majority of jurisdictions?',
      choices: [
        { id: 'a', label: 'Proximity test.' },
        { id: 'b', label: 'Unequivocality (“res ipsa”) test.' },
        { id: 'c', label: 'Probable desistence test.' },
        { id: 'd', label: 'Substantial step test.' },
      ],
      correctChoiceId: 'd',
      explanation: 'The MPC endorses the substantial step test, widely adopted for attempt actus reus.',
    },
    {
      id: 'q29',
      prompt: 'Under the MPC, abandonment is a defense to attempt only if:',
      choices: [
        { id: 'a', label: 'The defendant stops because he sees police approaching.' },
        { id: 'b', label: 'The defendant stops because he decides the crime will not succeed.' },
        { id: 'c', label: 'The defendant’s renunciation is complete and voluntary, and he abandons or prevents the crime.' },
        { id: 'd', label: 'The defendant is persuaded by a co-conspirator to stop.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Renunciation must be voluntary and complete, accompanied by abandonment or prevention.',
    },
    {
      id: 'q30',
      prompt: 'Under the “kill zone” theory described in your notes, attempted murder liability may extend to:',
      choices: [
        { id: 'a', label: 'Only the specifically named target of the attack.' },
        {
          id: 'b',
          label: 'Everyone in the zone of danger when the defendant uses a method intended to ensure the death of the target even if that necessarily endangers others.',
        },
        { id: 'c', label: 'Only victims who actually die.' },
        { id: 'd', label: 'Only victims who suffer serious bodily injury.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Intent to kill the target by creating a lethal zone can transfer to others within that zone for attempt.',
    },
    {
      id: 'q31',
      prompt: 'Under your complicity section, which of the following reflects the MPC standard for accomplice liability?',
      choices: [
        { id: 'a', label: 'The accomplice must be present at the scene to be liable.' },
        { id: 'b', label: 'The accomplice must act “with the purpose of promoting or facilitating” the offense and aid, agree to aid, or attempt to aid.' },
        { id: 'c', label: 'Mere knowledge of the crime is always sufficient.' },
        { id: 'd', label: 'Only pre-crime assistance counts, not assistance during the crime.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC requires purposeful promotion or facilitation plus assistance or an offer/attempt to assist.',
    },
    {
      id: 'q32',
      prompt: 'Under the MPC’s treatment of complicity and attempt:',
      choices: [
        { id: 'a', label: 'There is no liability if the principal never attempts or commits the crime.' },
        { id: 'b', label: 'One may be guilty of attempted complicity even if the principal does not commit or attempt the crime.' },
        { id: 'c', label: 'Accomplice liability is limited to misdemeanors.' },
        { id: 'd', label: 'Accessory-after-the-fact conduct is never punished.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC recognizes attempted complicity when someone purposely aids with requisite intent even if the crime is not tried.',
    },
    {
      id: 'q33',
      prompt: 'Under common law rules on withdrawal from complicity, which of the following is required for an aider (who actually helped) to withdraw?',
      choices: [
        { id: 'a', label: 'Merely changing his mind before the crime is committed.' },
        { id: 'b', label: 'Neutralizing his assistance or otherwise preventing the crime, such as by promptly notifying authorities.' },
        { id: 'c', label: 'Publicly announcing disapproval after the crime.' },
        { id: 'd', label: 'Filing an affidavit in court renouncing the crime.' },
      ],
      correctChoiceId: 'b',
      explanation: 'An aider must undo or counteract assistance, often by warning police or victims, to withdraw.',
    },
    {
      id: 'q34',
      prompt: 'Under the MPC withdrawal standard for accomplices in your notes, a defendant must terminate complicity before the offense and:',
      choices: [
        { id: 'a', label: 'Merely intend to discourage the other person.' },
        { id: 'b', label: 'Wholly deprive his aid of effectiveness or give timely warning to law enforcement or otherwise make proper effort to prevent the offense.' },
        { id: 'c', label: 'Convince all co-felons to abandon the scheme.' },
        { id: 'd', label: 'Submit a written statement to law enforcement.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Effective withdrawal under the MPC requires nullifying aid or proactively trying to prevent the crime.',
    },
    {
      id: 'q35',
      prompt: 'Which of the following best states the Pinkerton doctrine as described in your outline?',
      choices: [
        { id: 'a', label: 'Conspirators are liable only for the conspiracy itself.' },
        {
          id: 'b',
          label: 'Conspirators are liable for every act committed by any co-conspirator, regardless of foreseeability.',
        },
        {
          id: 'c',
          label: 'Conspirators are liable for substantive crimes committed by co-conspirators that are in furtherance of the conspiracy and reasonably foreseeable.',
        },
        { id: 'd', label: 'Conspirators are never liable for substantive crimes unless they personally participated.' },
      ],
      correctChoiceId: 'c',
      explanation: 'Pinkerton imposes liability for foreseeable crimes in furtherance of the conspiracy even without direct participation.',
    },
    {
      id: 'q36',
      prompt: 'Under the MPC’s approach to conspiracy in your notes:',
      choices: [
        { id: 'a', label: 'An overt act is always required for every conspiracy.' },
        { id: 'b', label: 'No overt act is required for conspiracies to commit first- and second-degree felonies.' },
        { id: 'c', label: 'The MPC adopts a bilateral agreement requirement.' },
        { id: 'd', label: 'Pinkerton liability is expanded.' },
      ],
      correctChoiceId: 'b',
      explanation: 'For the most serious felonies the MPC does not require proof of an overt act.',
    },
    {
      id: 'q37',
      prompt: 'According to your outline, withdrawal from a conspiracy under the MPC is a complete defense only if the defendant:',
      choices: [
        { id: 'a', label: 'Notifies at least one co-conspirator.' },
        { id: 'b', label: '“Thwarts the success of the conspiracy” under circumstances manifesting a complete and voluntary renunciation.' },
        { id: 'c', label: 'Merely changes his mind before the crime.' },
        { id: 'd', label: 'Discloses the conspiracy to any third party.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC requires thwarting the conspiracy with complete, voluntary renunciation for full withdrawal.',
    },
    {
      id: 'q38',
      prompt: 'Under the “perfect” self-defense description in your notes, which of the following is required?',
      choices: [
        { id: 'a', label: 'An honest belief in the need for force, whether reasonable or not.' },
        { id: 'b', label: 'An honest and reasonable belief in the need to use force to repel an immediate threat.' },
        { id: 'c', label: 'Evidence that the defendant used the least force imaginable.' },
        { id: 'd', label: 'Evidence that the defendant first attempted to flee.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Perfect self-defense demands a reasonable and honest belief in necessity against an imminent threat.',
    },
    {
      id: 'q39',
      prompt: 'Under the MPC’s “initial aggressor” doctrine as described in your materials:',
      choices: [
        { id: 'a', label: 'Any aggressor automatically loses any right to use deadly force.' },
        { id: 'b', label: 'The doctrine applies broadly to both deadly and non-deadly force.' },
        {
          id: 'c',
          label: 'It is narrow – applying only when the defendant provokes the use of deadly force in order to justify using deadly force (a “set up”).',
        },
        { id: 'd', label: 'It is identical to the common law majority rule.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The MPC limits initial aggressor loss of deadly-force defense to scenarios where the actor provokes deadly force to create a pretext.',
    },
    {
      id: 'q40',
      prompt: 'Under the MPC’s duty to retreat rule in your outline, which statement is accurate?',
      choices: [
        { id: 'a', label: 'There is never a duty to retreat.' },
        {
          id: 'b',
          label: 'There is a duty to retreat before using deadly force if the actor can do so with complete safety, except in specified settings such as one’s home or certain workplaces.',
        },
        { id: 'c', label: 'There is a duty to retreat before using any force, deadly or non-deadly.' },
        { id: 'd', label: 'Retreat is required only if the assailant is a stranger.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The MPC imposes a safe retreat requirement before deadly force, with exceptions like the home and workplace.',
    },
    {
      id: 'q41',
      prompt: 'Under the necessity doctrine in your notes, which requirement is rejected by the MPC but retained in the traditional approach?',
      choices: [
        { id: 'a', label: 'The harm avoided must be greater.' },
        { id: 'b', label: 'There must be no reasonable legal alternative.' },
        { id: 'c', label: 'The triggering event must be a “natural force.”' },
        { id: 'd', label: 'The actor must believe the conduct will avoid a greater harm.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The MPC removes the natural forces limitation, allowing necessity for human-caused harms.',
    },
    {
      id: 'q42',
      prompt: 'Under the MPC’s “imperfect necessity” concept in your outline, if a defendant recklessly brings about the situation requiring a choice of evils:',
      choices: [
        { id: 'a', label: 'He has a full necessity defense even to crimes of recklessness.' },
        {
          id: 'b',
          label: 'He has no necessity defense to crimes of recklessness but may have defense to purpose/knowledge crimes.',
        },
        { id: 'c', label: 'Necessity is never available to any crime.' },
        { id: 'd', label: 'He has a defense only if the harm avoided actually occurs.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Reckless creation of the emergency bars the defense for recklessness-grade offenses but can mitigate higher mens rea crimes.',
    },
    {
      id: 'q43',
      prompt: 'Under the MPC’s duress standard in your notes, which statement is correct?',
      choices: [
        { id: 'a', label: 'Duress requires an imminent and continuous threat of death or serious bodily harm.' },
        { id: 'b', label: 'Duress requires that the threat come only from a natural source.' },
        { id: 'c', label: 'Duress is potentially available for all homicide crimes.' },
        { id: 'd', label: 'Duress is unavailable if the defendant negligently placed himself in the situation.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The MPC allows duress even for homicide, focusing on a person of reasonable firmness standard.',
    },
    {
      id: 'q44',
      prompt: 'Under the common law duress doctrine described in your materials, which limitation does NOT exist in the MPC version?',
      choices: [
        { id: 'a', label: 'The threat must be of death or serious bodily harm.' },
        { id: 'b', label: 'The threat must be imminent and continuous.' },
        { id: 'c', label: 'The threat must be from another person.' },
        { id: 'd', label: 'Duress is no defense to intentional homicide.' },
      ],
      correctChoiceId: 'd',
      explanation: 'Common law bars duress for homicide, whereas the MPC permits it.',
    },
    {
      id: 'q45',
      prompt: 'Under the common law mistake-of-fact rules in your notes, which is correct?',
      choices: [
        { id: 'a', label: 'Any honest mistake is always a complete defense.' },
        { id: 'b', label: 'For specific-intent crimes, any genuine/honest mistake, even if unreasonable, can exonerate.' },
        { id: 'c', label: 'For malice crimes, only subjective belief matters; reasonableness is irrelevant.' },
        { id: 'd', label: 'Mistake is always available as a defense to strict liability crimes.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Specific-intent crimes permit an honest mistake defense regardless of reasonableness.',
    },
    {
      id: 'q46',
      prompt: 'Under the MPC, mistake of fact is a defense when:',
      choices: [
        { id: 'a', label: 'It negates the mens rea required for a material element of the offense.' },
        { id: 'b', label: 'It is reasonable, regardless of effect on mens rea.' },
        { id: 'c', label: 'It would have produced a lesser crime under the actual facts.' },
        { id: 'd', label: 'It relates solely to the grading of the offense.' },
      ],
      correctChoiceId: 'a',
      explanation: 'If the mistake undercuts the required mental state for any element, it is a defense under the MPC.',
    },
    {
      id: 'q47',
      prompt: 'Under your notes, which statement correctly distinguishes common law and MPC intoxication defenses?',
      choices: [
        { id: 'a', label: 'Common law allows intoxication as a defense to general intent crimes; MPC does not.' },
        {
          id: 'b',
          label: 'Common law permits voluntary intoxication as a defense only to specific-intent crimes; MPC permits it as a defense to purpose and knowledge crimes, but not to recklessness or negligence.',
        },
        { id: 'c', label: 'Both systems treat intoxication identically.' },
        { id: 'd', label: 'MPC allows intoxication as a defense to strict liability crimes only.' },
      ],
      correctChoiceId: 'b',
      explanation: 'Voluntary intoxication can negate specific intent/common law or purpose/knowledge under MPC but not lower mens rea.',
    },
    {
      id: 'q48',
      prompt: 'Under the subjective (majority) entrapment test described in your materials, the main focus is on:',
      choices: [
        { id: 'a', label: 'The degree of government overreaching, regardless of the defendant’s predisposition.' },
        { id: 'b', label: 'Whether a person of reasonable firmness would have been induced.' },
        {
          id: 'c',
          label: 'Whether the defendant was predisposed to commit the crime, with prior similar offenses and ready acquiescence being relevant.',
        },
        { id: 'd', label: 'Whether the government used any undercover agents.' },
      ],
      correctChoiceId: 'c',
      explanation: 'The subjective test centers on the defendant’s predisposition, considering willingness and prior conduct.',
    },
    {
      id: 'q49',
      prompt: 'Under the M’Naghten insanity test in your notes, which combination states the two alternative prongs?',
      choices: [
        { id: 'a', label: 'Inability to appreciate the wrongfulness of the act or to conform conduct to law.' },
        { id: 'b', label: 'Inability to understand the nature and quality of the act or to know that the act was wrong.' },
        { id: 'c', label: 'Inability to resist impulses or to follow commands.' },
        { id: 'd', label: 'Inability to distinguish legal wrong from moral wrong.' },
      ],
      correctChoiceId: 'b',
      explanation: 'M’Naghten asks whether the defendant understood the act’s nature or knew it was wrong.',
    },
    {
      id: 'q50',
      prompt: 'Under the ALI/MPC insanity test described in your materials:',
      choices: [
        { id: 'a', label: 'Only cognitive incapacity—failure to know right from wrong—matters.' },
        {
          id: 'b',
          label:
            'The defendant is insane if, as a result of mental disease or defect, he lacks substantial capacity either to appreciate the wrongfulness of his conduct or to conform his conduct to the law.',
        },
        { id: 'c', label: 'The test is stricter than M’Naghten and rarely satisfied.' },
        { id: 'd', label: 'The defense is unavailable in all homicide cases.' },
      ],
      correctChoiceId: 'b',
      explanation: 'The ALI/MPC test uses a substantial-capacity standard for both cognitive and volitional impairment.',
    },
  ];

  return Promise.resolve(sampleQuestions);
}

const state = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: {}, // questionId -> choiceId
};

const questionContainer = document.getElementById('question-container');
const feedbackEl = document.getElementById('feedback');
const progressCountEl = document.getElementById('progress-count');
const scoreEl = document.getElementById('score');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const reviewToggle = document.getElementById('review-toggle');
const reviewList = document.getElementById('review-list');

function loadProgress() {
  const savedIndex = Number(localStorage.getItem(storageKeys.index));
  const savedScore = Number(localStorage.getItem(storageKeys.score));
  const savedAnswered = localStorage.getItem(storageKeys.answered);

  if (!Number.isNaN(savedIndex)) {
    state.currentIndex = savedIndex;
  }
  if (!Number.isNaN(savedScore)) {
    state.score = savedScore;
  }
  if (savedAnswered) {
    try {
      state.answered = JSON.parse(savedAnswered);
    } catch (error) {
      state.answered = {};
    }
  }
}

function saveProgress() {
  localStorage.setItem(storageKeys.index, String(state.currentIndex));
  localStorage.setItem(storageKeys.score, String(state.score));
  localStorage.setItem(storageKeys.answered, JSON.stringify(state.answered));
}

function setButtonStates({ submitted }) {
  submitBtn.disabled = submitted;
  nextBtn.disabled = state.currentIndex >= state.questions.length - 1 || !submitted;
}

function clearStoredProgress() {
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  questionContainer.innerHTML = '';
  if (!question) {
    questionContainer.innerHTML = '<p>Loading questions…</p>';
    return;
  }

  const formFragment = document.createDocumentFragment();
  const questionWrapper = document.createElement('div');
  questionWrapper.className = 'question';
  questionWrapper.setAttribute('aria-live', 'polite');

  const prompt = document.createElement('h2');
  prompt.textContent = question.prompt;
  questionWrapper.appendChild(prompt);

  const choicesList = document.createElement('div');
  choicesList.className = 'choices';
  choicesList.setAttribute('role', 'radiogroup');
  choicesList.setAttribute('aria-label', 'Possible answers');

  question.choices.forEach((choice) => {
    const choiceLabel = document.createElement('label');
    choiceLabel.className = 'choice';
    choiceLabel.htmlFor = `${question.id}-${choice.id}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `choice-${question.id}`;
    input.id = `${question.id}-${choice.id}`;
    input.value = choice.id;
    input.required = true;
    input.setAttribute('aria-label', choice.label);

    const savedChoice = state.answered[question.id];
    if (savedChoice === choice.id) {
      input.checked = true;
    }

    const labelText = document.createElement('span');
    labelText.textContent = choice.label;

    choiceLabel.appendChild(input);
    choiceLabel.appendChild(labelText);
    choicesList.appendChild(choiceLabel);
  });

  questionWrapper.appendChild(choicesList);
  formFragment.appendChild(questionWrapper);
  questionContainer.appendChild(formFragment);

  const submitted = Boolean(state.answered[question.id]);
  setButtonStates({ submitted });
  updateProgress();
  renderFeedback();
}

function renderFeedback() {
  const question = state.questions[state.currentIndex];
  const answer = state.answered[question?.id];
  if (!question || !answer) {
    feedbackEl.innerHTML = '';
    return;
  }

  const isCorrect = answer === question.correctChoiceId;
  feedbackEl.innerHTML = '';

  const result = document.createElement('p');
  result.className = isCorrect ? 'correct' : 'incorrect';
  result.textContent = isCorrect ? 'Correct!' : 'Incorrect.';

  const explanation = document.createElement('p');
  explanation.textContent = question.explanation;

  feedbackEl.appendChild(result);
  feedbackEl.appendChild(explanation);
}

function updateProgress() {
  progressCountEl.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;
  scoreEl.textContent = `Score: ${state.score}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const question = state.questions[state.currentIndex];
  if (!question) return;
  if (state.answered[question.id]) {
    return;
  }

  const selected = questionContainer.querySelector('input[type="radio"]:checked');
  if (!selected) {
    feedbackEl.innerHTML = '<p class="incorrect">Select an answer to continue.</p>';
    return;
  }

  const choiceId = selected.value;
  state.answered[question.id] = choiceId;
  if (choiceId === question.correctChoiceId) {
    state.score += 1;
  }

  saveProgress();
  renderFeedback();
  setButtonStates({ submitted: true });
  renderReviewCards();
}

function handleNext() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    saveProgress();
    renderQuestion();
  }
}

function handleReset() {
  if (!state.questions.length) return;
  state.currentIndex = 0;
  state.score = 0;
  state.answered = {};

  clearStoredProgress();
  renderQuestion();
  renderReviewCards();
}

function renderReviewCards() {
  reviewList.innerHTML = '';
  state.questions.forEach((question, index) => {
    const choiceId = state.answered[question.id];
    if (!choiceId) return;

    const card = document.createElement('article');
    card.className = 'review-card';

    const title = document.createElement('h3');
    title.textContent = `Q${index + 1}: ${question.prompt}`;

    const status = document.createElement('p');
    const isCorrect = choiceId === question.correctChoiceId;
    status.className = `status ${isCorrect ? 'correct' : 'incorrect'}`;
    status.textContent = isCorrect ? 'Correct' : 'Incorrect';

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `Your answer: ${labelForChoice(question, choiceId)}`;

    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;

    const choicesList = document.createElement('ul');
    question.choices.forEach((choice) => {
      const li = document.createElement('li');
      const isSelected = choice.id === choiceId;
      const isAnswer = choice.id === question.correctChoiceId;
      li.textContent = `${choice.label}${isAnswer ? ' (correct answer)' : ''}${isSelected && !isAnswer ? ' (your choice)' : ''}`;
      choicesList.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(meta);
    card.appendChild(explanation);
    card.appendChild(choicesList);
    reviewList.appendChild(card);
  });
}

function labelForChoice(question, choiceId) {
  const match = question.choices.find((choice) => choice.id === choiceId);
  return match ? match.label : 'Not answered';
}

function toggleReviewMode() {
  reviewList.classList.toggle('is-visible');
  if (reviewList.classList.contains('is-visible')) {
    renderReviewCards();
    reviewToggle.textContent = 'Hide Review Mode';
  } else {
    reviewToggle.textContent = 'Show Review Mode';
  }
}

function init() {
  loadProgress();
  loadQuestions().then((questions) => {
    state.questions = questions;
    if (state.currentIndex >= questions.length) {
      state.currentIndex = 0;
    }
    renderQuestion();
    renderReviewCards();
  });
}

const quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', handleSubmit);
nextBtn.addEventListener('click', handleNext);
resetBtn.addEventListener('click', handleReset);
reviewToggle.addEventListener('click', toggleReviewMode);

document.addEventListener('DOMContentLoaded', init);
