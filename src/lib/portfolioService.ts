
import { supabase } from "./supabase";

export async function getPortfolioData() {
    const [
        profileResult,
        educationResult,
        skillsResult,
        projectsResult,
        achievementsResult,
        certificationsResult,
        experienceResult,
    ] = await Promise.all([
        supabase
            .from("profiles")
            .select("*")
            .eq("is_published", true)
            .maybeSingle(),

        supabase
            .from("education")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),

        supabase
            .from("skills")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),

        supabase
            .from("projects")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),

        supabase
            .from("achievements")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),

        supabase
            .from("certifications")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),

        supabase
            .from("experience")
            .select("*")
            .eq("is_published", true)
            .order("sort_order"),
    ]);

    const results = [
        profileResult,
        educationResult,
        skillsResult,
        projectsResult,
        achievementsResult,
        certificationsResult,
        experienceResult,
    ];

    const failedResult = results.find((result) => result.error);

    if (failedResult?.error) {
        throw new Error(failedResult.error.message);
    }

    return {
        profile: profileResult.data,
        education: educationResult.data ?? [],
        skills: skillsResult.data ?? [],
        projects: projectsResult.data ?? [],
        achievements: achievementsResult.data ?? [],
        certifications: certificationsResult.data ?? [],
        experience: experienceResult.data ?? [],
    };
}
