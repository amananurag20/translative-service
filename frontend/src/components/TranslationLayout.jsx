import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic, Volume2, MoreVertical, X, Globe, Settings, Maximize2, ZoomIn, Search } from 'lucide-react';

const TranslationLayout = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('EN');
    const [targetLang, setTargetLang] = useState('ES');
    const [isTranslating, setIsTranslating] = useState(false);

    // Debounce translation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputText.trim()) {
                handleTranslate();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [inputText, targetLang]);

    const handleTranslate = async () => {
        if (!inputText.trim()) return;

        setIsTranslating(true);
        try {
            const response = await axios.post('http://localhost:5000/translate', {
                text: inputText,
                target_lang: targetLang
            });

            if (response.data && response.data.translations && response.data.translations.length > 0) {
                setTranslatedText(response.data.translations[0].text);
            }
        } catch (error) {
            console.error("Translation failed", error);
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-gray-800 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-white flex flex-col p-6 border-r border-gray-100 shadow-sm z-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-indigo-600 tracking-tight">Lexi</h1>
                </div>

                <nav className="flex-1 space-y-4">
                    <button className="flex items-center space-x-3 text-gray-500 hover:text-indigo-600 transition-colors w-full p-2 rounded-lg hover:bg-gray-50">
                        <X size={20} />
                        <span className="font-medium">End</span>
                    </button>
                    <button className="flex items-center space-x-3 text-gray-500 hover:text-indigo-600 transition-colors w-full p-2 rounded-lg hover:bg-gray-50">
                        <Globe size={20} />
                        <span className="font-medium">Insights</span>
                    </button>
                    <button className="flex items-center space-x-3 text-gray-500 hover:text-indigo-600 transition-colors w-full p-2 rounded-lg hover:bg-gray-50">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </button>
                </nav>

                <div className="mt-auto">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-semibold text-indigo-500 uppercase">Early Access</div>
                        </div>
                        <div className="font-bold text-gray-900">Faster</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative">
                <header className="absolute top-0 right-0 p-4">
                    <button className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Toggle Dev Mode</button>
                </header>

                <div className="flex-1 flex w-full h-full">
                    {/* Left Panel (Source) */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col relative border-r border-gray-100 bg-[#fefefe]">
                        <div className="flex items-center justify-between mb-6">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                                className="text-xl font-bold text-indigo-700 bg-transparent border-none outline-none cursor-pointer"
                            >
                                <option value="EN">English</option>
                                <option value="DE">German</option>
                                <option value="FR">French</option>
                            </select>
                        </div>

                        <div className="flex-1 relative">
                            <textarea
                                className="w-full h-full resize-none border-none outline-none text-2xl md:text-3xl text-gray-700 leading-relaxed bg-transparent placeholder-gray-300"
                                placeholder="Start speaking or typing..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            {/* Visual Indicator of 'Active' */}
                            {inputText && <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>}
                        </div>

                        <div className="mt-auto pt-6 flex flex-col items-center">
                            <div className="mb-3 text-sm text-gray-400 font-medium">Tap to speak</div>
                            <button className="w-full h-24 rounded-2xl bg-yellow-200 hover:bg-yellow-300 transition-colors flex items-center justify-center shadow-lg transform active:scale-95 duration-200">
                                <Mic size={32} className="text-gray-800" />
                            </button>
                        </div>
                    </div>

                    {/* Right Panel (Target) */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col relative bg-[#f8f9ff]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-baseline space-x-2">
                                <select
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                    className="text-xl font-bold text-indigo-700 bg-transparent border-none outline-none cursor-pointer"
                                >
                                    <option value="ES">Spanish</option>
                                    <option value="DE">German</option>
                                    <option value="FR">French</option>
                                    <option value="JA">Japanese</option>
                                    <option value="IT">Italian</option>
                                    <option value="PT">Portuguese</option>
                                    <option value="RU">Russian</option>
                                    <option value="ZH">Chinese</option>
                                </select>
                                <span className="text-sm text-gray-400 italic font-normal">Español</span>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            {isTranslating ? (
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-4 py-1">
                                        <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
                                        <div className="h-4 bg-indigo-100 rounded"></div>
                                        <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-2xl md:text-3xl text-gray-700 leading-relaxed">
                                    {translatedText || <span className="text-gray-300">Translation will appear here...</span>}
                                </div>
                            )}

                            {/* Floating Volume Icon */}
                            {translatedText && (
                                <button className="absolute right-0 top-1/2 p-2 text-indigo-400 hover:text-indigo-600 transition-colors">
                                    <Volume2 size={24} />
                                </button>
                            )}
                        </div>

                        <div className="mt-auto pt-6 flex flex-col items-center relative">
                            <div className="mb-3 text-sm text-gray-400 font-medium">Presione para hablar</div>
                            <button className="w-full h-24 rounded-2xl bg-teal-300 hover:bg-teal-400 transition-colors flex items-center justify-center shadow-lg transform active:scale-95 duration-200">
                                <Mic size={32} className="text-gray-800" />
                            </button>

                            {/* Bottom Right Actions */}
                            <div className="absolute right-0 bottom-4 flex space-x-2">
                                <button className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700">
                                    <ZoomIn size={18} />
                                </button>
                                <button className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700">
                                    <Maximize2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Floating Controls */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="bg-gray-800 rounded-full px-6 py-3 flex items-center space-x-6 text-white shadow-2xl pointer-events-auto">
                        <button className="hover:text-gray-300"><Mic size={20} className="text-gray-400 line-through" /></button>
                        <button className="hover:text-gray-300"><Volume2 size={20} /></button>
                        <button className="hover:text-gray-300"><MoreVertical size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslationLayout;
