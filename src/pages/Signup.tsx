import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Users,
  Lightbulb,
  BookOpen,
  Check,
  ChevronRight,
  Briefcase,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
// import { ArrowLeft, GraduationCap, Users, Check, ChevronRight, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import CollegeVerificationForm from "@/components/signup/CollegeVerificationForm";
import type { UserRole, CollegeDetails } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  // const {signInWithGoogle} = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    institution: "",
    fieldOfStudy: "",
    company: "",
    jobTitle: "",
    desiredField: "",
    experience: "",
  });

  // Role selection handlers
  const handleRoleSelect = (role: UserRole) => setSelectedRole(role);
  const handleCollegeAccessClick = () => {
    setSelectedRole("college-access");
    setStep(2);
  };
  const handleContinue = () => selectedRole && setStep(3);
  const handleBack = () => {
    setStep(1);
    setSelectedRole(null);
  };
  const handleCollegeVerification = (details: CollegeDetails) => {
    console.log("College details:", details);
    setStep(3);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setIsSubmitting(true);
      const fullName = `${formData.firstName} ${formData.lastName}`;

      await signUp(formData.email, formData.password, {
        name: fullName,
        role: selectedRole,
        ...(selectedRole === "college-credit-student" && {
          education: [
            {
              institution: formData.institution,
              field: formData.fieldOfStudy,
              degree: "Student",
              startDate: new Date().toISOString(),
              current: true,
            },
          ],
        }),
        ...(selectedRole === "professional" && {
          professional: [
            {
              company: formData.company,
              position: formData.jobTitle,
              startDate: new Date().toISOString(),
              current: true,
            },
          ],
        }),
        ...(selectedRole === "independent" && {
          careerInterests: [formData.desiredField],
        }),
      });

      navigate("/onboarding");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      signInWithGoogle();
    } catch (error: any) {
      toast.error(error.message || "Google signup failed");
    }
  };

  const roleOptions = [
    {
      id: "college-credit-student",
      title: "College Student",
      description: "Non-affiliated student - access our learning resources",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "professional",
      title: "Working Professional",
      description: "Professional executive level upskilling",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "independent",
      title: "Looking for a Job",
      description: "Bridge skill gaps and become relevant in the job market",
      icon: <Users className="h-6 w-6" />,
    },
  ];
  // Role-specific form components
  const getRoleSpecificQuestions = () => {
    switch (selectedRole) {
      case "college-credit-student":
        return (
          <div className="space-y-2">
            <label htmlFor="institution" className="text-sm font-medium">
              Institution
            </label>
            <input
              id="institution"
              className="w-full px-3 py-2 border border-input rounded-md"
              type="text"
              placeholder="Enter your school or university"
              value={formData.institution}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="fieldOfStudy" className="text-sm font-medium">
              Field of Study
            </label>
            <input
              id="fieldOfStudy"
              className="w-full px-3 py-2 border border-input rounded-md"
              type="text"
              placeholder="E.g., Computer Science, Business, etc."
              value={formData.fieldOfStudy}
              onChange={handleInputChange}
            />
          </div>
        );
      case "professional":
        return (
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              className="w-full px-3 py-2 border border-input rounded-md"
              type="text"
              placeholder="Enter your Company name"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </label>
            <input
              id="jobTitle"
              className="w-full px-3 py-2 border border-input rounded-md"
              type="text"
              placeholder="Enter your current Job Title"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
        );
      case "independent":
        return (
          <div className="space-y-2">
            <label htmlFor="desiredField" className="text-sm font-medium">
              Desired Career Field
            </label>
            <input
              id="desiredField"
              className="w-full px-3 py-2 border border-input rounded-md"
              type="text"
              placeholder="E.g., Software Development, Data Science, etc."
              value={formData.desiredField}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="experience" className="text-sm font-medium">
              Years of Experience
            </label>
            <select
              id="experience"
              className="w-full px-3 py-2 border border-input rounded-md"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option value="">Experience Level</option>
              <option value="0">0 (Fresh Graduate)</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-3">Join MindMatrix</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Create your account to unlock AI-powered education and career
              development
            </p>
          </div>

          <button
            onClick={handleCollegeAccessClick}
            className="w-full bg-primary/90 text-white rounded-xl p-6 mb-10 text-center hover:bg-primary transition-colors cursor-pointer"
          >
            <h2 className="text-2xl font-bold tracking-tight">
              MindMatrix for College Students Access
            </h2>
          </button>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Are you an independent learner?
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Take control of your future with personalized learning
                      paths
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-center">
                    I am a...
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {roleOptions.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id as UserRole)}
                        className={`group relative rounded-xl border p-6 text-left transition-all hover-scale ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="space-y-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedRole === role.id
                                ? "bg-primary text-white"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            } transition-colors`}
                          >
                            {role.icon}
                          </div>
                          <div className="space-y-1.5">
                            <h3 className="font-medium">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                        </div>
                        {selectedRole === role.id && (
                          <div className="absolute top-4 right-4">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button
                      size="lg"
                      onClick={handleContinue}
                      disabled={!selectedRole}
                    >
                      Continue
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : // <motion.div
            //   key="role-selection"
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   exit={{ opacity: 0, y: -20 }}
            //   transition={{ duration: 0.3 }}
            // >
            //   {/* Role selection UI remains similar */}
            // </motion.div>
            step === 2 ? (
              <motion.div
                key="college-verification"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">
                  Verify Your College Enrollment
                </h2>
                <CollegeVerificationForm
                  onSubmit={handleCollegeVerification}
                  onBack={handleBack}
                />
              </motion.div>
            ) : (
              <motion.div
                key="registration-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="mb-6"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to role selection
                </Button>

                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Create your{" "}
                    {selectedRole === "college-credit-student"
                      ? "Student"
                      : selectedRole === "professional"
                      ? "Professional"
                      : selectedRole === "independent"
                      ? "Job Seeker"
                      : "College Access"}{" "}
                    account
                  </h2>

                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Button
                        onClick={handleGoogleSignup}
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center justify-center gap-2 py-6"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                      </Button>

                      <div className="flex items-center w-full md:w-2/3">
                        <div className="flex-1 h-px bg-border"></div>
                        <span className="px-4 text-sm text-muted-foreground">
                          or signup with email
                        </span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSignupSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="firstName"
                            className="text-sm font-medium"
                          >
                            First Name
                          </label>
                          <input
                            id="firstName"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="lastName"
                            className="text-sm font-medium"
                          >
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters long with a
                          combination of letters, numbers, and symbols
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phoneNumber"
                          className="text-sm font-medium"
                        >
                          Phone Number (Optional)
                        </label>
                        <input
                          id="phoneNumber"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      {getRoleSpecificQuestions()}

                      <div className="flex items-start space-x-2 pt-2">
                        <input
                          id="terms"
                          type="checkbox"
                          className="rounded border-input text-primary focus:ring-primary"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground"
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>

                      <div className="mt-8">
                        <Button
                          size="lg"
                          className="w-full"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                              Creating Account...
                            </span>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </div>
                    </form>
                    <p className="text-sm text-center text-muted-foreground mt-6">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
