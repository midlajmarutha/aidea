"use client"
import Link from "next/link";
import React, { useState } from "react";

const NewProjectProgress = ({ onboardingStep , setOnboardingStep}) => {
    
    const steps = [
        {
            title: "Add site",
            step: "site",
            href:"/projects/new?step=site"
        },
        {
            title: "Embed script",
            step: "script",
            href:"/projects/new?step=script"
        },
        {
            title: "Test",
            step: "test",
            href:"/projects/new?step=test"
        },
    ];
    return (
        <div>
            <ul className="text-sm flex gap-4">
                {steps.map((item) => {
                    return (
                        <li key={item.title}>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 relative bg-gray-400 rounded-full ${onboardingStep === item.step && ' bg-orange-500 after:content-[""] after:w-full after:h-full after:animate-ping after:absolute inset-0 after:bg-orange-500 after:rounded-full'}`}></div>
                                <Link className={onboardingStep === item.step ? 'text-orange-500' : 'text-gray-600'} href={item.href} onClick={()=>{setOnboardingStep(item.step)}}>{item.title}</Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NewProjectProgress;
